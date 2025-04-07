import mongoose, { Document, Schema } from "mongoose"

export interface IBlog extends Document {
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  edited: boolean,
  userId: mongoose.Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  edited: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
})

export const Blog = mongoose.model<IBlog>('blog', blogSchema);
