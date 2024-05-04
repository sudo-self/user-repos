
    document.getElementById("githubForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("usernameInput").value;
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            displayProfile(data);
            await fetchRepos(username);
        } catch (error) {
            console.error("Error fetching GitHub profile data:", error);
        }
    });

    function displayProfile(data) {
        document.getElementById("profile").style.display = "block";
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("name").textContent = data.name || data.login;
        document.getElementById("bio").textContent = data.bio || "No bio available.";
        document.getElementById("followers").textContent = `Followers: ${data.followers}`;
        document.getElementById("following").textContent = `Following: ${data.following}`;
        document.getElementById("publicRepos").textContent = `Public Repositories: ${data.public_repos}`;
    }

    async function fetchRepos(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await response.json();
            displayRepos(data);
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
        }
    }

    function displayRepos(repos) {
        document.getElementById("repos").style.display = "block";
        const repoList = document.getElementById("repoList");
        repoList.innerHTML = "";
        repos.forEach(repo => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = repo.html_url;
            a.textContent = repo.name;
            li.appendChild(a);
            repoList.appendChild(li);
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        document.querySelector("h1").classList.toggle("text-black");

        // Adjust particle color based on dark mode
        const particleColor = document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000";
        particlesJS("particles-js", {
            "particles": {
                "color": {
                    "value": particleColor
                }
            }
        });
    });

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80, // Adjust the number of particles
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Change the color of the particles
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 1, // Adjust the size of the particles
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

