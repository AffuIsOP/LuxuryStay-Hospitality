const { StaffRole } = require('../Model/staffrole');





// @METHOD GET
// API: http://localhost:5000/admin/staffrole
async function getStaff(req, res) {
    try {
        const allStaff = await StaffRole.find();
        return res.status(200).json(allStaff);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error fetching staff roles' });
    }
}

// @METHOD GET
// API: http://localhost:5000/admin/staffrole/:id
async function getStaffRoleById(req, res) {
    const { id } = req.params;

    try {
        const staffRole = await StaffRole.findOne({ staffroleid: id });

        if (!staffRole) {
            return res.status(404).send({ error: 'Staff role not found' });
        }

        return res.status(200).json(staffRole);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error fetching staff role' });
    }
}


// @METHOD POST
// API: http://localhost:5000/admin/staffrole


async function generateStaffId() {
    try {
        const latestStaff = await StaffRole.findOne().sort({ staffroleid: -1 });
        if (latestStaff) {
            return latestStaff.staffroleid + 1;
        } else {
            return 1;
        }
    } catch (error) {
        console.log('Error generating staffroleid:', error);
        throw error;
    }
}


async function addStaff(req, res) {
    const { staffrole, staffroledescription, status } = req.body;

    try {
        const existingStaffRole = await StaffRole.findOne({ staffrole: staffrole.toLowerCase() });

        if (existingStaffRole) {
            return res.status(400).send({ error: 'Staff role already exists' });
        }

        const staffroleid = await generateStaffId();

        const newStaff = new StaffRole({
            staffroleid: staffroleid,
            staffrole: staffrole.toLowerCase(),
            staffroledescription: staffroledescription,
            status: status.toLowerCase(),
        });

        const savedStaff = await newStaff.save();

        return res.status(201).json(savedStaff);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error adding staff' });
    }
}


// @METHOD PUT
// API: http://localhost:5000/admin/staffrole/:id
async function updateStaff(req, res) {
    const { id } = req.params;
    const { staffrole, staffroledescription, status } = req.body;

    try {
        const staff = await StaffRole.findOne({ staffroleid: id });
        if (!staff) {
            return res.status(404).send({ error: 'Staff role not found' });
        }


        if (staffrole) staff.staffrole = staffrole.toLowerCase();
        if (staffroledescription) staff.staffroledescription = staffroledescription.toLowerCase();
        if (status) staff.status = status.toLowerCase();

        const updatedStaff = await staff.save();
        return res.status(200).json(updatedStaff);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error updating staff' });
    }
}


// @METHOD DELETE
// API: http://localhost:5000/admin/staffrole/:id
async function deleteStaff(req, res) {
    const staffId = req.params.id;

    try {
        const deletedStaff = await StaffRole.findOneAndDelete({ staffroleid: staffId });

        if (!deletedStaff) {
            return res.status(404).send({ error: 'Staff role not found' });
        }

        return res.status(200).send({ message: 'Staff role deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error deleting staff' });
    }
}




module.exports = {
    getStaff,
    getStaffRoleById,
    addStaff,
    updateStaff,
    deleteStaff,
}