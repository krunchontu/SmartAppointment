import HttpError from '@wasp/core/HttpError.js'

export const getUser = async ({ username }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { username }
  })

  if (!user) { throw new HttpError(404, `No user with username ${username}`) }

  return user
}

export const getServices = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Service.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getAppointment = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const appointment = await context.entities.Appointment.findUnique({
    where: { id },
  });

  if (!appointment) throw new HttpError(404, `No appointment with id ${id}`);

  return appointment;
}

export const getAppointmentsByService = async ({ serviceId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const appointments = await context.entities.Appointment.findMany({
    where: {
      serviceId
    }
  });

  return appointments;
}