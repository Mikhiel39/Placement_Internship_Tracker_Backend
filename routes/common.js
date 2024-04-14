const { getAllCompanies } = require("../controller/company");

// Import the controller function for tnp coordinators
const { getTnp } = require("../controller/tnpcoordinator");

const { getAlumni } = require("../controller/alumni");

// New route for Tnp Cordinator by admins
router.route("/tnpcoordinator/").get(getTnp);
// New route for alumni by admins
router.route("/alumni/").get(getAlumni);
router.route("/company/").get(getAllCompanies);
