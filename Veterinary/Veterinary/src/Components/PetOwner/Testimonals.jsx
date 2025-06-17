import React from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Dog Owner',
    feedback: 'The online appointment system is so convenient, and the staff is always friendly and professional. My dog loves coming here!',
  },
  {
    name: 'Michael Rodriguez',
    title: 'Cat Owner',
    feedback: "The digital records system has been a game-changer. I can access my cat’s medical history anytime, and the reminders for vaccinations are so helpful.",
  },
  {
    name: 'Emily Chen',
    title: 'Multiple Pets',
    feedback: 'When my rabbit needed emergency care, the 24/7 service was literally a lifesaver. The team was quick, caring, and thorough.',
  },
];

const Testimonials = () => {
  return (
    <div className="py-5 bg-white w-100" >
      <div className="container-fluid">
        <div className="text-center mb-5">
          <span className="badge bg-success mb-3 large-badge">Testimonials</span>
          <h2 className="fw-bold mt-2">What Pet Owners Say</h2>
          <p className="text-muted">
            Hear from our satisfied clients about their experience with our veterinary services.
          </p>
        </div>

        <div className="row">
          {testimonials.map((t, idx) => (
            <div className="col-md-4 " key={idx}>
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-light me-3"
                      style={{ width: '40px', height: '40px' }}
                    ></div>
                    <div>
                      <h6 className="mb-0 fw-bold">{t.name}</h6>
                      <small className="text-muted">{t.title}</small>
                    </div>
                  </div>
                  <p className="text-muted">"{t.feedback}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
