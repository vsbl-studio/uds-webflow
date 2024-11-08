import gsap from "gsap";

export default function () {
    const teamMembers = document.querySelectorAll(".team_members-list-item");
    const sensitivityMultiplier = 0.05;

    teamMembers.forEach((member) => {
        const memberInfo = member.querySelector(".member-info-wrapper");

        member.addEventListener("mousemove", (e) => {
            const rect = member.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const relX = (e.clientX - centerX) * sensitivityMultiplier;
            const relY = (e.clientY - centerY) * sensitivityMultiplier;

            gsap.to(memberInfo, {
                x: relX,
                y: relY,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });
}
