import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Index on eventId for faster lookup of bookings by event
bookingSchema.index({ eventId: 1 });

// Compound index for preventing duplicate bookings (optional but recommended)
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Pre-save hook to validate that the referenced event exists
 */
bookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or has been modified
  if (this.isNew || this.isModified('eventId')) {
    try {
      const Event = mongoose.models.Event || mongoose.model('Event');
      const eventExists = await Event.findById(this.eventId);

      if (!eventExists) {
        return next(new Error('Cannot create booking: Event does not exist'));
      }
    } catch (error) {
      return next(new Error(`Event validation failed: ${(error as Error).message}`));
    }
  }

  next();
});

// Prevent model recompilation in development
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
