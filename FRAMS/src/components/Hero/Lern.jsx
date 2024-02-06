import Hero from './Hero'

function Lern() {
  const heading = "How To Use";
  const subtitle = "Facial Recongnication based Attendance Management System";
  const content =
    "First of all admins have to collect the ID and Password for the login from the devloper, after they can change. Admin can add and remove the staff members to this system and staff can also add and remove students to this system depending upon their designation. To join, user have to upload their 5 clear images to this sysetem along with the necessary information. Now staff can take live attendance of students and populate in the file along with time stamp. student can see their attendance in the TrackMate sectoin.";
  const extraTxt = "Previous";
  const nextTxt = "Login to start";
  const nextPath = "login";
  const extraPath = "";
  return (
    <div>
      <Hero
              heading={heading}
              subtitle={subtitle}
              content={content}
              nextTxt={nextTxt}
              extraTxt={extraTxt}
              nextPath={nextPath}
              extraPath={extraPath}
            />
    </div>
  )
}

export default Lern
