const data = require("./data");

function formatSchedule(day, hours) {
  // Revisamos si la hora está abierta
  if (hours.open === 0 && hours.close === 0) return "CLOSED";
  return `Open from ${hours.open}am until ${hours.close % 12 || 12}${
    hours.close < 12 ? "am" : "pm" // 12 o 12pm, preferiria 24h
  }`;
}

function entryCalculator(entrants) {
  // Revisamos si no hay ningún entrada
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  //
  return Object.entries(entrants).reduce(
    (total, [type, count]) => total + data.prices[type] * count,
    0
  );
}

function schedule(dayName) {
  const schedule = data.hours; // Obtenemos el array de horarios
  const readableSchedule = {}; // Salida

  // Revisamos si el día existe en el array de horarios
  if (dayName && schedule[dayName]) {
    return { [dayName]: formatSchedule(dayName, schedule[dayName]) };
  }

  // Revisamos si el día existe en el array de horarios
  Object.keys(schedule).forEach((day) => {
    // Damos formato
    readableSchedule[day] = formatSchedule(day, schedule[day]);
  });

  return readableSchedule;
}

// Check to see if any of the strings in
function animalCount(species) {
  // Revisamos si no hay ningún animal
  if (species) {
    return data.animals.find((animal) => animal.name === species).residents
      .length;
  }
  return data.animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function animalMap(options = {}) {
  const { includeNames = false, sex = "" } = options; // Opciones
  const locations = ["NE", "NW", "SE", "SW"]; // Locaciones
  const result = {}; // Salida

  locations.forEach((location) => {
    const animalsInLocation = data.animals.filter(
      (animal) => animal.location === location
    ); // Obtenemos los animales en la locación

    if (!includeNames) {
      result[location] = animalsInLocation.map((animal) => animal.name); // Solo nombre
    } else {
      result[location] = animalsInLocation.map((animal) => {
        let names = animal.residents; // Obtenemos los nombres

        if (sex) {
          names = names.filter((resident) => resident.sex === sex); // Filtramos por sexo
        }

        return {
          [animal.name]: names.map((resident) => resident.name), // Solo nombre
        };
      });
    }
  });

  return result;
}

function animalPopularity(rating) {
  const result = {};

  // Rellenamos el objeto result con claves de popularidad y arrays de nombres de animales como valores
  data.animals.forEach((animal) => {
    const animalRating = animal.popularity.toString();
    if (!result[animalRating]) {
      result[animalRating] = [];
    }
    result[animalRating].push(animal.name);
  });

  // Si se proporciona un rating, retorna directamente el array correspondiente a ese rating
  if (rating !== undefined) {
    return result[rating.toString()] || [];
  }

  // Si no se proporciona un rating, retorna el objeto completo
  return result;
}

function animalsByIds(ids) {
  if (!ids) return []; // si no vienen ids es un array vacío
  return data.animals.filter((animal) => ids.includes(animal.id)); // Filtramos por id
}

function animalByName(animalName) {
  let animalDetail = {};

  data.animals.forEach(({ name: species, residents }) => {
    residents.forEach(({ name, sex, age }) => {
      if (name === animalName) {
        animalDetail = { name, sex, age, species }; // Solo nombre, sexo, edad y especie
      }
    });
  });

  return animalDetail; // Datos del animal
}

function employeesByIds(ids) {
  // Similar a animalsByIds, pero para los empleados
  if (!ids) return [];
  return data.employees.filter((employee) => ids.includes(employee.id)); // Filtramos por id
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  // Similar a animalByName, pero para los empleados
  return (
    data.employees.find(
      ({ firstName, lastName }) =>
        firstName === employeeName || lastName === employeeName
    ) || {}
  );
}

function managersForEmployee(idOrName) {
  const employee = data.employees.find(
    ({ id, firstName, lastName }) =>
      id === idOrName || firstName === idOrName || lastName === idOrName
  );

  if (!employee) return {};

  const managers = employee.managers.map((managerId) =>
    data.employees.find(({ id }) => id === managerId)
  );

  return {
    ...employee,
    managers: managers.map(
      ({ firstName, lastName }) => `${firstName} ${lastName}`
    ),
  };
}

function employeeCoverage(idOrName) {
  const coverage = {};

  data.employees.forEach(({ id, firstName, lastName, responsibleFor }) => {
    // Hacemos la comparación de id, nombre y apellidos
    if (
      !idOrName ||
      id === idOrName ||
      firstName === idOrName ||
      lastName === idOrName
    ) {
      coverage[`${firstName} ${lastName}`] = responsibleFor.map(
        (animalId) => data.animals.find(({ id }) => id === animalId).name
      );
    }
  });

  return coverage;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage,
};
