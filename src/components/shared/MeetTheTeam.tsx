const teamMembers = [
  {
    name: "Mostafizur Rahman",
    role: "Founder & CEO",
    bio: "meeting.com is the visionary behind our company. With over 20 years of experience, she leads with passion and expertise.",
    image: "https://i.ibb.co/GH6V7Wx/my.jpg",
  },
  {
    name: "Md.Mahfuz",
    role: "CTO",
    bio: "Bob oversees our technology strategy. He ensures our systems are robust, secure, and innovative.",
    image: "https://i.ibb.co/SvVVnb0/m.jpg",
  },
  {
    name: "Abdullah Newaz",
    role: "Marketing Director",
    bio: "Catherine drives our marketing efforts with creativity and strategic thinking. She helps us connect with our audience effectively.",
    image: "https://i.ibb.co/yXggr0r/my2.jpg",
  },
  // Add more team members as needed
];

const MeetTheTeam = () => {
  return (
    <section className="py-16 bg-[#1C2430]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#003580] mb-12 text-center animate__animated animate__fadeIn">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#1C2430] p-6 rounded-lg shadow-lg text-center animate__animated animate__fadeIn animate__delay-1s"
            >
              <img
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src={member.image}
              />
              <h3 className="text-xl font-semibold text-[#003580] mb-2">
                {member.name}
              </h3>
              <p className="text-sm text-[#1C2430]/40 mb-4">{member.role}</p>
              <p className="text-[#1C2430]/30">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
