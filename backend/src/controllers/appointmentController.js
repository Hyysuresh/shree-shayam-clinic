import { Appointment } from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, phone, date, time, message } = req.body;

    if (!name || !phone || !date || !time) {
      return res
        .status(400)
        .json({ message: "Name, phone, date, and time are required" });
    }

    const appointment = await Appointment.create({
      name,
      phone,
      date,
      time,
      message
    });

    return res.status(201).json({
      message: "Appointment request submitted successfully",
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create appointment right now" });
  }
};

export const getAppointments = async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch appointments right now" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    return res.json({
      message: `Appointment ${status} successfully`,
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update appointment right now" });
  }
};
