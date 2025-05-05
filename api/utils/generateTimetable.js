const { addDays, isBefore, format, getDay } = require("date-fns");

async function generateSoutenances({
  sujets,
  salles,
  professors,
  timeConstraints,
  startDate,
  endDate,
  saveSoutenance,
  updateSujet,
}) {
  const roomAvailability = {}; // { "yyyy-MM-dd": { "08:00": salleId } }
  const professorAvailability = {}; // { profId: { "yyyy-MM-dd": [slots...] } }
  const professorDailyCount = {}; // { profId: { "yyyy-MM-dd": count } }

  const isWeekend = (date) => getDay(date) === 6 || getDay(date) === 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const twoHourSlots = ["08:00", "10:00", "12:00", "14:00", "16:00"];

  let scheduled = 0;
  let skipped = 0;
  let errors = 0;

  const getConstraint = (profId) => {
    const constraint = timeConstraints.find((tc) => tc.professorId === profId);
    return constraint ? constraint.unavailableTimes : [];
  };

  for (const sujet of sujets) {
    try {
      if (sujet.soutenance) {
        skipped++;
        continue;
      }

      const president = professors.find((p) => p.name === sujet.president);
      const reporter = professors.find((p) => p.name === sujet.reporter);
      const encadrant = professors.find((p) => p.name === sujet.encadrant);

      if (!president || !reporter || !encadrant) {
        skipped++;
        continue;
      }

      let date = new Date(start);
      let scheduledForThisSujet = false;

      while (isBefore(date, end) || format(date, "yyyy-MM-dd") === format(end, "yyyy-MM-dd")) {
        if (isWeekend(date)) {
          date = addDays(date, 1);
          continue;
        }

        const dateStr = format(date, "yyyy-MM-dd");

        // shuffle for fairness
        const shuffledSalles = salles.sort(() => Math.random() - 0.5);
        const shuffledSlots = twoHourSlots.sort(() => Math.random() - 0.5);

        for (const salle of shuffledSalles) {
          for (const slot of shuffledSlots) {
            // Check room availability
            roomAvailability[dateStr] = roomAvailability[dateStr] || {};
            if (roomAvailability[dateStr][slot]) continue;

            const professors = [president, reporter, encadrant];
            let canSchedule = true;

            for (const prof of professors) {
              const profId = prof._id;

              const dailyCount = professorDailyCount[profId]?.[dateStr] || 0;
              if (dailyCount >= 3) {
                canSchedule = false;
                break;
              }

              const profSlots = professorAvailability[profId]?.[dateStr] || [];
              if (profSlots.includes(slot)) {
                canSchedule = false;
                break;
              }

              const constraints = getConstraint(profId);
              if (constraints.includes(slot)) {
                canSchedule = false;
                break;
              }
            }

            if (!canSchedule) continue;

            // Schedule
            roomAvailability[dateStr][slot] = salle._id;

            for (const prof of professors) {
              const profId = prof._id;

              if (!professorAvailability[profId]) professorAvailability[profId] = {};
              if (!professorAvailability[profId][dateStr]) professorAvailability[profId][dateStr] = [];
              professorAvailability[profId][dateStr].push(slot);

              if (!professorDailyCount[profId]) professorDailyCount[profId] = {};
              professorDailyCount[profId][dateStr] = (professorDailyCount[profId][dateStr] || 0) + 1;
            }

            const soutenance = {
              sujetPfeId: sujet._id,
              salleId: salle._id,
              date: dateStr,
              time: slot,
              fichierPdf: null,
              status: "Scheduled",
              assignedProfessors: professors.map(p => p._id),
            };

            await saveSoutenance(soutenance);
            await updateSujet(sujet._id, { soutenance: true });

            console.log(`✅ Scheduled sujet ${sujet._id} on ${dateStr} at ${slot} in salle ${salle.name}`);
            scheduled++;
            scheduledForThisSujet = true;
            break;
          }

          if (scheduledForThisSujet) break;
        }

        if (scheduledForThisSujet) break;

        date = addDays(date, 1);
      }

      if (!scheduledForThisSujet) {
        console.log(`❌ Could not schedule sujet ${sujet._id} — no available slot`);
        skipped++;
      }

    } catch (err) {
      console.error(`❌ Error scheduling sujet ${sujet._id}:`, err);
      errors++;
    }
  }

  console.log(`✅ Finished: ${scheduled} scheduled, ${skipped} skipped, ${errors} errors`);
}

module.exports = { generateSoutenances };
