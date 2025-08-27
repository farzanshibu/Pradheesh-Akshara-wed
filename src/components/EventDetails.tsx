import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Users, ExternalLink } from 'lucide-react';
import qrSrc from '../assets/qr.webp'; // Ensure you have a QR code image in the assets folder

const EventDetails: React.FC = () => {
  const events = [
    {
      title: 'Wedding Ceremony',
      date: 'Sunday, August 31, 2025',
      time: '10:00 AM - 11:00 AM (Muhurtham)',
      venue: 'GURUKRIPA Auditorium, Peruntattil, Thalassery',
      description: 'The sacred moment when we become one. Witness our vows of eternal love.',
      type: 'wedding',
      color: 'from-amber-600 to-orange-700',
      contact: {
        family: "Mr. Sunil Kumar & Mrs. Sheeja",
        address: '"Thejus Nivas", Eranjoli, Thalassery, Kannur',
        phone: "9495102601"
      },
      mapUrl: "https://maps.google.com/?q=GURUKRIPA+Auditorium+Peruntattil+Thalassery"
    },
    {
      title: 'Wedding Reception',
      date: 'Monday, September 1, 2025',
      time: '4:00 PM onwards',
      venue: 'A.H. Palace, Mankara, Palakkad',
      description: 'Celebrate with us as we start our new journey together!',
      type: 'reception',
      color: 'from-amber-700 to-yellow-800',
      contact: {
        family: "Mr. Prabhakaran P.K. & Mrs. Redhika C.",
        address: '"Pananthura House", Vellaroad, Mankara P.O., Palakkad',
        phone: "9447880075, 6282863803"
      },
      mapUrl: "https://maps.google.com/?q=A.H.+Palace+Mankara+Palakkad"
    }
  ];

  return (
    <section id="events" className="py-12 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-6">
            Event Details
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join us for these special moments as we celebrate our love and unity 💕
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200/50 h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${event.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  <Calendar className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-gray-700">
                    <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{event.venue}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-6">
                  {event.description}
                </p>

                {/* Contact Information */}
                <div className="bg-amber-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm text-amber-700">
                    <p className="font-medium">{event.contact.family}</p>
                    <p>{event.contact.address}</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{event.contact.phone}</span>
                    </div>
                  </div>
                </div>

                {/* View Map Button */}
                <div className="text-center">
                  <motion.a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${event.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin className="h-5 w-5" />
                    <span>View Location</span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>

                {event.type === 'wedding' && (
                  <div className="bg-orange-50 rounded-xl p-4 text-center mt-4">
                    <p className="text-orange-700 font-semibold text-sm">
                      1201 Chingam 15 (Malayalam Calendar)
                    </p>
                  </div>
                )}

                {event.type === 'reception' && (
                  <div className="bg-yellow-50 rounded-xl p-4 text-center mt-4">
                    <p className="text-yellow-700 font-semibold text-sm">
                      1201 Chingam 16 (Malayalam Calendar)
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Try to locate a QR image in the assets folder (optional) */}
          {/** If you have a file named like qr.png / qrcode.jpg in src/assets it will be shown below. */}
          {/* <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-200/50"> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
              {/* Dress Code */}
              {/* <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shirt className="h-6 w-6 text-amber-600 mr-2" />
                  Dress Code
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <h4 className="font-semibold text-amber-800 mb-2">Traditional Indian Attire</h4>
                    <p className="text-amber-700 text-sm">
                      Elegant traditional wear preferred. Warm colors like gold, maroon, orange, and brown are welcome!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <h4 className="font-semibold text-orange-800 mb-2">Color Palette</h4>
                    <div className="flex space-x-2 mt-2">
                      <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                      <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                      <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
                      <div className="w-6 h-6 bg-amber-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Special Notes */}
              {/* <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-amber-600 mr-2" />
                  Special Notes
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-xl flex flex-col items-center">
                    <h4 className="font-semibold text-yellow-800 mb-2">Photography</h4>
                    {qrSrc ? (
                      <>
                        <img src={qrSrc} alt="Wedding photos QR" className="w-36 h-36 object-contain my-2 rounded-md shadow-md" />
                        <p className="text-yellow-800 font-semibold text-sm text-center bg-yellow-100 px-3 py-1 rounded-md shadow-sm mt-1">
                          Use this QR to see the live wedding photos
                        </p>
                       </>
                    ) : (
                      <></>  )}
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <h4 className="font-semibold text-orange-800 mb-2">Parking</h4>
                    <p className="text-orange-700 text-sm">
                      Ample parking available at both venues. Please follow the guidance of our coordinators.
                    </p>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;