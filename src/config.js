export const express = {
  port: process.env.EXPRESS_PORT || 3000,
  host: process.env.EXPRESS_HOST || 'localhost'
};

export const mailer = {
  from: 'donotreply@ridepost.com',
  name: 'RidePost - Do Not Reply'
};
