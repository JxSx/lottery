//https://rpj.bembi.org/#simple
const simplePreset = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: false,
        value_area: 3200
      }
    },
    color: {
      value: "#0FF"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: 1,
        speed: 10,
        opacity_min: .5,
        sync: !1
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: !1,
        speed: 20,
        size_min: 1,
        sync: true
      }
    },
    line_linked: {
      enable: !0,
      distance: 120,
      color: "#FF0",
      opacity: .6,
      width: 1,
    },
  },
}


//雪花效果
//https://rpj.bembi.org/#snow
const snow = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false
      }
    },
    size: {
      value: 10,
      random: true
    },
    move: {
      direction: "bottom",
      out_mode: "out"
    },
    line_linked: {
      enable: false
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "remove"
      }
    },
    modes: {
      remove: {
        particles_nb: 10
      }
    }
  }
}

const bubbles = {
  "particles": {
      "number": {
          "value": 160,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
          "onclick": {
              "enable": true,
              "mode": "repulse"
          }
      },
      "modes": {
          "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 400,
              "duration": 4
          }
      }
  }
}

const nightSky = {
  "particles": {
      "number": {
          "value": 60,
          "density": {
              "enable": true,
              "value_area": 1500
          }
      },
      "line_linked": {
          "enable": true,
          "opacity": 0.02
      },
      "move": {
          "direction": "right",
          "speed": 0.05
      },
      "size": {
          "value": 1
      },
      "opacity": {
          "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.05
          }
      }
  },
  "interactivity": {
      "events": {
          "onclick": {
              "enable": true,
              "mode": "push"
          }
      },
      "modes": {
          "push": {
              "particles_nb": 1
          }
      }
  },
  "retina_detect": true
}

const multipleImages = {
  "particles": {
      "number": {
          "value": 8,
          "density": {
              "enable": true,
              "value_area": 800
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "speed": 1,
          "out_mode": "out"
      },
      "shape": {
          "type": [
              "images",
              "circle"
          ],
          "images": [
              {
                  "src": "../assets/btn_on.png",
                  "height": 20,
                  "width": 23
              },
              {
                  "src": "/k8s.2d579d24.svg",
                  "height": 20,
                  "width": 20
              },
              {
                  "src": "/code.b3b4c4f4.png",
                  "height": 20,
                  "width": 20
              }
          ]
      },
      "color": {
          "value": "#CCC"
      },
      "size": {
          "value": 30,
          "random": false,
          "anim": {
              "enable": true,
              "speed": 4,
              "size_min": 10,
              "sync": false
          }
      }
  },
  "retina_detect": false
}

export default [
  snow, simplePreset, bubbles, nightSky, multipleImages
]