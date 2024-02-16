import HttpError from '@wasp/core/HttpError.js'

export const registerUser = async (args, context) => {
  if (!args.username || !args.password || !args.profession || !args.contactInfo) {
    throw new HttpError(400, 'Missing required fields.');
  }

  const existingUser = await context.entities.User.findUnique({
    where: { username: args.username }
  });

  if (existingUser) {
    throw new HttpError(409, 'Username already exists.');
  }

  const newUser = await context.entities.User.create({
    data: {
      username: args.username,
      password: args.password,
      profession: args.profession,
      contactInfo: args.contactInfo
    }
  });

  return newUser;
}

export const addService = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { serviceName, serviceDetails, userId } = args;

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });

  if (!user) { throw new HttpError(404, 'User not found') }

  return context.entities.Service.create({
    data: {
      serviceName,
      serviceDetails,
      user: { connect: { id: userId } }
    }
  });
}

export const bookAppointment = async (args, context) => {
  // Implementation goes here
}

export const updateAppointment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const appointment = await context.entities.Appointment.findUnique({
    where: { id: args.id }
  });
  if (!appointment) { throw new HttpError(404) };

  return context.entities.Appointment.update({
    where: { id: args.id },
    data: { status: args.status }
  });
}
