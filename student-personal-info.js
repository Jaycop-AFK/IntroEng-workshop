document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const template = document.getElementById('member-template');
    const addMemberBtn = document.getElementById('add-member-btn');
    const maxMembers = 4;

    if (!membersContainer || !template || !addMemberBtn) {
        return;
    }

    const focusFirstInput = (memberBlock) => {
        const firstInput = memberBlock.querySelector('[data-field="fullName"]');
        if (firstInput) {
            firstInput.focus();
        }
    };

    const updateMemberBlocks = () => {
        const memberBlocks = Array.from(membersContainer.querySelectorAll('.member-block'));

        memberBlocks.forEach((block, index) => {
            const memberNumber = index + 1;
            block.dataset.memberIndex = String(memberNumber);

            const heading = block.querySelector('.member-heading');
            if (heading) {
                heading.textContent = `ผู้จัดทำคนที่ ${memberNumber}`;
            }

            const fullNameInput = block.querySelector('[data-field="fullName"]');
            const fullNameLabel = block.querySelector('[data-label="fullName"]');
            if (fullNameInput && fullNameLabel) {
                const id = `member-${memberNumber}-fullName`;
                fullNameInput.id = id;
                fullNameInput.name = `members[${index}][fullName]`;
                fullNameLabel.setAttribute('for', id);
            }

            const studentIdInput = block.querySelector('[data-field="studentId"]');
            const studentIdLabel = block.querySelector('[data-label="studentId"]');
            if (studentIdInput && studentIdLabel) {
                const id = `member-${memberNumber}-studentId`;
                studentIdInput.id = id;
                studentIdInput.name = `members[${index}][studentId]`;
                studentIdLabel.setAttribute('for', id);
            }

            const branchSelect = block.querySelector('[data-field="branch"]');
            const branchLabel = block.querySelector('[data-label="branch"]');
            if (branchSelect && branchLabel) {
                const id = `member-${memberNumber}-branch`;
                branchSelect.id = id;
                branchSelect.name = `members[${index}][branch]`;
                branchLabel.setAttribute('for', id);
            }

            const removeBtn = block.querySelector('.remove-member-btn');
            if (removeBtn) {
                const hideRemove = memberBlocks.length === 1;
                removeBtn.disabled = hideRemove;
                removeBtn.classList.toggle('hidden', hideRemove);
            }
        });

        addMemberBtn.disabled = memberBlocks.length >= maxMembers;
    };

    addMemberBtn.addEventListener('click', () => {
        const memberCount = membersContainer.querySelectorAll('.member-block').length;
        if (memberCount >= maxMembers) {
            return;
        }

        const clone = template.content.cloneNode(true);
        membersContainer.appendChild(clone);

        updateMemberBlocks();

        const newestBlock = membersContainer.querySelector('.member-block:last-of-type');
        if (newestBlock) {
            focusFirstInput(newestBlock);
        }
    });

    membersContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains('remove-member-btn')) {
            const memberBlock = target.closest('.member-block');
            if (memberBlock) {
                memberBlock.remove();
                updateMemberBlocks();
            }
        }
    });

    updateMemberBlocks();
});
