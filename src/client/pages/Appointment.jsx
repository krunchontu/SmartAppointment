import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getAppointment from '@wasp/queries/getAppointment';
import updateAppointment from '@wasp/actions/updateAppointment';

export function AppointmentPage() {
  const { appointmentId } = useParams();
  const { data: appointment, isLoading, error } = useQuery(getAppointment, { id: appointmentId });
  const updateAppointmentFn = useAction(updateAppointmentAction);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateAppointment = (status) => {
    updateAppointmentFn({ id: appointmentId, status });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Appointment Details</h1>
      <div className='mb-4'>
        <p>Appointment ID: {appointment.id}</p>
        <p>Date and Time: {appointment.dateTime}</p>
        <p>Status: {appointment.status}</p>
        <p>Customer Name: {appointment.customerName}</p>
        <p>Customer Email: {appointment.customerEmail}</p>
        <p>Customer Contact: {appointment.customerContact}</p>
        <p>Comments: {appointment.comments}</p>
      </div>
      <div className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>Update Appointment Status:</h2>
        <button
          onClick={() => handleUpdateAppointment('Pending')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
        >
          Mark as Pending
        </button>
        <button
          onClick={() => handleUpdateAppointment('Confirmed')}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
        >
          Mark as Confirmed
        </button>
        <button
          onClick={() => handleUpdateAppointment('Cancelled')}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Mark as Cancelled
        </button>
      </div>
    </div>
  );
}