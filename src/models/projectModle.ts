import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    startDate: Date,
    endDate: Date,
    manager: String,
    type: String,
    members: [String],
    color : String,
    task : [
        {
            name: String,
            description: String,
            startDate: String,
            endDate: String,
            status: String,
            lastUpdate: String,
            
        }
    ]
});

export default mongoose.model('Project', projectSchema);