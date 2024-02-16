import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUser from '@wasp/queries/getUser';
import getServices from '@wasp/queries/getServices';
import getAppointmentsByService from '@wasp/queries/getAppointmentsByService';
import addService from '@wasp/actions/addService';
import bookAppointment from '@wasp/actions/bookAppointment';
import updateAppointment from '@wasp/actions/updateAppointment';

export function DashboardPage() {
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser, { username: 'username' });
  const { data: services, isLoading: servicesLoading, error: servicesError } = useQuery(getServices);
  const { data: appointments, isLoading: appointmentsLoading, error: appointmentsError } = useQuery(getAppointmentsByService, { serviceId: 1 });
  const addServiceFn = useAction(addService);
  const bookAppointmentFn = useAction(bookAppointment);
  const updateAppointmentFn = useAction(updateAppointment);

  if (userLoading || servicesLoading || appointmentsLoading) return 'Loading...';
  if (userError || servicesError || appointmentsError) return 'Error: ' + (userError || servicesError || appointmentsError);

  const handleAddService = () => {
    addServiceFn({ serviceName: 'Service', serviceDetails: 'Service Details', userId: user.id });
  };

  const handleBookAppointment = () => {
    bookAppointmentFn({ dateTime: '2022-01-01 09:00:00', status: 'Pending', customerName: 'John Doe', customerEmail: 'john.doe@example.com', customerContact: '1234567890', comments: 'Appointment comments', serviceId: services[0].id });
  };

  const handleUpdateAppointment = () => {
    updateAppointmentFn({ id: appointments[0].id, status: 'Confirmed' });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-2xl font-bold mb-2">Welcome, {user.username}!</h2>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Your Services</h3>
        {services.map((service) => (
          <div key={service.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h4 className="text-lg font-bold mb-2">{service.serviceName}</h4>
            <p>{service.serviceDetails}</p>
          </div>
        ))}
        <button
          onClick={handleAddService}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Service
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Appointments</h3>
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h4 className="text-lg font-bold mb-2">{appointment.dateTime}</h4>
            <p>Status: {appointment.status}</p>
            <p>Customer: {appointment.customerName}</p>
            <p>Email: {appointment.customerEmail}</p>
            <p>Contact: {appointment.customerContact}</p>
            <p>Comments: {appointment.comments}</p>
            <button
              onClick={handleUpdateAppointment}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Appointment
            </button>
          </div>
        ))}
        <button
          onClick={handleBookAppointment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}