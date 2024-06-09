const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
        notes: {
          type: String,
          default: undefined,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    shipCost: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Finished", "Cancelled"],
      default: "Pending",
    },

    dateOrdered: {
      type: Date,
    },

    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    notification: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
orderSchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "reference",
  localField: "_id",
});
orderSchema.pre(`/^find/`, function (next) {
  if (!this.isAvailable) {
    this.isAvailable = true;
  }
  next();
});
module.exports = mongoose.model("Order", orderSchema);
