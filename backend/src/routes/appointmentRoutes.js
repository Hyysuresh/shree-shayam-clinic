import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/appointments", createAppointment);
router.get("/appointments", protect, getAppointments);
router.put("/appointments/:id", protect, updateAppointmentStatus);

export default router;
