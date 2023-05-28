import React, { useState } from 'react';
import './About.css';
import Nopal from './gambar/Naufal.jpg'
import Pito from './gambar/vito.jpg'
import Cwan from './gambar/cuan.jpg'
import Eron from './gambar/Aron (2).jpg'

const About = () => {
  const [people, ] = useState([
    {
      id: 1,
      name: 'Naufal Marra Arrafi',
      nim: '00000074899',
      img: Nopal,
      instagram: 'naufalmarra/',
    },
    {
      id: 2,
      name: 'Oktavian Vito Widiyanta',
      nim: '00000074775',
      img: Pito,
      instagram: 'oktavianvitow/',
    },
    {
      id: 3,
      name: 'Cuan Zefanya',
      nim: '00000073860',
      img: Cwan,
      instagram: 'cuanzefanya/',
    },
    {
      id: 4,
      name: 'Aaron Kho',
      nim: '00000073906',
      img: Eron,
      instagram: 'eren.kho/',
    },
  ]);

  return (
    <div className="about-container">
      <h2>About Us</h2>
      <div className="row">
        {people.map((person) => (
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3" key={person.id}>
            <div className="card">
              <img
                src={person.img}
                className="card-img-top"
                alt={person.name}
              />
                <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">NIM: {person.nim}</p>
                <div className="instagram-link">
                <a href={`https://www.instagram.com/${person.instagram}`} target="_blank" rel="noopener noreferrer" className="instagram-btn">Instagram</a>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className="references">
        <h3>References</h3>
        <p>Nopal</p>
      </div>
    </div>
  );
};

export default About;
