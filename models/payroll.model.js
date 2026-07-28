import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    month: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowance: {
        type: Number,
        default: 0
    },
    deduction: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },
    paymentDate: {
        type: Date
    }
}, {
    timestamps: true
});

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
