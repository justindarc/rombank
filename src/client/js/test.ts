window.addEventListener('DOMContentLoaded', function() {
  const tbody = document.getElementById('tbody-romsets') as HTMLTableElement;
  const form = document.getElementById('form-romset-create') as HTMLFormElement;
  const inputName = document.getElementById('input-romset-name') as HTMLInputElement;
  const inputPath = document.getElementById('input-romset-path') as HTMLInputElement;

  tbody.addEventListener('click', function(event) {
    const target = event.target as HTMLElement;
    if (!target.matches('button[data-action]')) {
      return;
    }

    fetch(target.dataset.action, {
      method: target.dataset.method
    }).then(response => response.json()).then((json) => {
      loadROMSets();
      console.log(json);
    }).catch((error) => {
      console.error(error);
    });
  });

  form.addEventListener('submit', function(event) {
    const formData = new FormData(form);
    formData.append('name', inputName.value);
    formData.append('path', inputPath.value);

    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputName.value,
        path: inputPath.value
      })
    }).then(response => response.json()).then((json) => {
      loadROMSets();
      console.log(json);
    }).catch((error) => {
      console.error(error);
    });

    form.reset();

    const firstInput = form[0] as HTMLInputElement;
    firstInput?.focus();

    event.preventDefault();
  });

  loadROMSets();

  function loadROMSets() {
    fetch('/api/romsets').then(response => response.json()).then((json) => {
      const trs = json.data.map((romset) => {
        return `<tr>
          <td>
            <button class="btn btn-sm btn-danger" data-action="/api/romsets/${romset.id}" data-method="delete">Delete</button>
          </td>
          <td>${romset.name}</td>
          <td>${romset.path}</td>
        </tr>`;
      });
  
      tbody.innerHTML = trs.join('');
      console.log(json);
    }).catch((error) => {
      console.error(error);
    });
  }
});
