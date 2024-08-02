
const moment = require('moment');
const Candidates= require('../models/Users');


//Get the details  Get method
module.exports.index = async (req, res) => {
    try {
        const events = await Candidates.find({});
       
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            dob: moment(event.dob).format('DD-MM-YYYY')
        }));
        res.json(formattedEvents);
      
    } catch (err) {
        console.error('Error in listing data', err);
        res.status(500).send('Error in listing data');
    }
};

// Create Candidates post method
module.exports.detailspost = async (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;

    try {
        const student = await Candidates.findOne({ registration_number });

        if (student) {
            // Student with the same registration number already exists
            return res.status(400).json({ error: 'Duplicate registration number. Please use a different registration number.' });
        }

        const newEvent = new Candidates({
            name,
            registration_number,
            dept,
            dob: new Date(dob),
            email,
            description
        });

        await newEvent.save();
        res.status(200).json({ message: 'User created successfully' });
       
    } catch (err) {
        console.error('Error saving event', err);
        res.status(500).json({ error: 'Error saving user' });
    }
};



// to view the edit page
module.exports.detailsupdateget = async (req, res) => {
    let registration_number = req.params.registration_number;
    try {
        // Fetch the event using Mongoose
        const student = await Candidates.findOne({  registration_number });

        if (!student) {
            return res.status(404).json({ error: 'Candidates not found' });
        }
        const formattedEvent = {
            ...student.toObject(),
            dob: moment(student.dob).format('YYYY-MM-DD')
        };

        res.json(formattedEvent);
    } catch (err) {
        console.error('Error in listing data', err);
        res.status(500).json({ error: 'Error in listing data' });
    }
};


//edit the users update method
module.exports.detailsupdate = async (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;
    try {
        const updatedEvent = await Candidates.findOneAndUpdate(
            { registration_number: registration_number }, 
            {
                name,
                registration_number,
                dept,
                dob: new Date(dob), 
                email,
                description
            },
            { new: true, runValidators: true } 
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: 'No record found with the provided registration number.' });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
       
        }
    } catch (err) {
        console.log('Error in updating data', err);
        res.status(500).json({err});
    }
};




// to view the delete page
// module.exports.detailsdeleteget = async (req, res) => {
//     let registration_number = req.params.registration_number;
//     try {
//         // Fetch the event using Mongoose
//         const student = await Candidates.findOne({ registration_number: registration_number });

//         if (!student) {
//             return res.status(404).send('Candidates not found');
//         }

//         // Format the event data
//         const formattedEvent = {
//             ...student.toObject(),
//             dob: moment(student.dob).format('YYYY-MM-DD')
//         };

//         res.render('delete', { student: formattedEvent });
//     } catch (err) {
//         console.error('Error in listing data', err);
//         res.status(500).send('Error in listing data');
//     }
// };

//delete the users Delete method
module.exports.detailsdelete = async (req, res) => {
    const { registration_number } = req.params;
    try {
        const result = await Candidates.findOneAndDelete({  registration_number });

        if (!result) {
            return res.status(404).json({ error: 'No record found with the provided registration number.' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (err) {
        console.log('Error in deleting data', err);
        res.status(500).json({ error: 'Error in deleting data' });
    }
};