document.addEventListener('DOMContentLoaded', () => {
  const users = {
    funcionario: {
      password: '123456',
      role: 'Funcionario Aduanero',
      displayName: 'Luis Contreras'
    },
    transportista: {
      password: '123456',
      role: 'Transportista',
      displayName: 'María Torres'
    }
  };

  const views = {
    funcionario: {
      dashboard: loadFuncionarioDashboard,
      documentos: loadValidacionDocumentos,
      usuarios: loadGestionUsuarios,
      auditorias: loadAuditorias,
      monitoreo: loadMonitoreo,
      registro: loadRegistroMenores
    },
    transportista: {
      dashboard: loadTransportistaDashboard,
      tracking: loadTrackingPedidos,
      vehiculos: loadRegistroVehiculos,
      documentos: loadSubidaDocumentos
    }
  };

  let currentUser = null;

  // Elementos del DOM
  const loginBtn = document.getElementById('loginButton');
  const logoutBtn = document.getElementById('logoutButton');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginView = document.getElementById('loginView');
  const mainLayout = document.getElementById('mainLayout');
  const userDisplay = document.getElementById('userDisplay');
  const mainMenu = document.getElementById('mainMenu');
  const viewContainer = document.getElementById('viewContainer');

  loginBtn.addEventListener('click', () => {
    const user = usernameInput.value.toLowerCase();
    const pass = passwordInput.value;

    if (!users[user] || users[user].password !== pass) {
      alert('Credenciales incorrectas');
      return;
    }

    currentUser = users[user];
    loginView.style.display = 'none';
    mainLayout.style.display = 'block';
    userDisplay.textContent = `${currentUser.displayName} | ${currentUser.role}`;

    setupMenu(user);
    loadView('dashboard');
  });

  logoutBtn.addEventListener('click', () => {
    currentUser = null;
    mainLayout.style.display = 'none';
    loginView.style.display = 'block';
    usernameInput.value = '';
    passwordInput.value = '';
    hideAllViews();
  });

  function setupMenu(userType) {
    const menuOptions = views[userType];
    let html = '';
    Object.keys(menuOptions).forEach(key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      html += `<li data-view="${key}">${label}</li>`;
    });
    mainMenu.innerHTML = html;

    mainMenu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        mainMenu.querySelectorAll('li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        loadView(li.getAttribute('data-view'));
      });
    });
  }

  function loadView(view) {
    hideAllViews();
    if (currentUser) {
      const fn = views[getUserType()][view];
      fn ? fn() : showPlaceholder(view);
    }
  }

  function getUserType() {
    return Object.keys(users).find(k => users[k].displayName === currentUser.displayName);
  }

  function hideAllViews() {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  }

  function showView(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }

  function showPlaceholder(viewName) {
    const id = `${viewName}View`;
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<h1>${viewName}</h1><p>En desarrollo...</p>`;
      showView(id);
    }
  }

  // Funcionario
  function loadFuncionarioDashboard() {
    const view = document.getElementById('dashboardView');
    view.innerHTML = `
      <h1 class="page-title">Panel Institucional</h1>
      <div class="cards-container">
        <div class="card"><h2 class="card-title">Documentos Validados</h2><div class="card-value">482</div></div>
        <div class="card"><h2 class="card-title">Auditorías</h2><div class="card-value">38</div></div>
        <div class="card"><h2 class="card-title">Usuarios Registrados</h2><div class="card-value">213</div></div>
        <div class="card"><h2 class="card-title">Vehículos en tránsito</h2><div class="card-value">124</div></div>
      </div>
    `;
    showView('dashboardView');
  }

  function loadValidacionDocumentos() {
    const view = document.getElementById('documentosView');
    view.innerHTML = `
      <h1 class="page-title">Validación de Documentos</h1>
      <div class="table-container">
        <table class="table">
          <thead><tr><th>Tipo</th><th>RUT</th><th>Documento</th><th>Fecha</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>
            <tr><td>Factura</td><td>12345678-9</td><td>Factura123.pdf</td><td>15-07-2025</td><td><span class="status status-pending">Pendiente</span></td><td><button>Validar</button></td></tr>
            <tr><td>Cert. Origen</td><td>98765432-1</td><td>Cert987.pdf</td><td>15-07-2025</td><td><span class="status status-active">Aprobado</span></td><td><button>Ver</button></td></tr>
          </tbody>
        </table>
      </div>
    `;
    showView('documentosView');
  }

  function loadGestionUsuarios() {
    const view = document.getElementById('usuariosView');
    view.innerHTML = `
      <h1 class="page-title">Gestión de Usuarios</h1>
      <div class="table-container">
        <table class="table">
          <thead><tr><th>Nombre</th><th>RUT</th><th>Rol</th><th>Email</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr><td>Patricio Díaz</td><td>11222333-4</td><td>Transportista</td><td>pdiaz@correo.cl</td><td><button>Editar</button></td></tr>
            <tr><td>Daniela Ríos</td><td>99888777-6</td><td>Funcionario</td><td>drios@sac.cl</td><td><button>Editar</button></td></tr>
          </tbody>
        </table>
      </div>
    `;
    showView('usuariosView');
  }

  function loadAuditorias() {
    const view = document.getElementById('auditoriasView');
    view.innerHTML = `
      <h1 class="page-title">Reportes de Auditoría</h1>
      <div class="document-grid">
        <div class="document-card"><div class="document-icon">PDF</div><div class="document-title">Informe Aduana Abril</div><div class="document-meta">04/2025 | 1.2MB</div><div class="document-actions"><button>Ver</button></div></div>
        <div class="document-card"><div class="document-icon">PDF</div><div class="document-title">Reporte Incidencias</div><div class="document-meta">06/2025 | 900KB</div><div class="document-actions"><button>Ver</button></div></div>
      </div>
    `;
    showView('auditoriasView');
  }

  function loadMonitoreo() {
    const view = document.getElementById('monitoreoView');
    view.innerHTML = `
      <h1 class="page-title">Monitoreo GPS</h1>
      <div class="card"><p>Vehículos rastreados en tiempo real.</p><p><strong>Ruta destacada:</strong> Ruta 5 Norte, KM 221</p></div>
    `;
    showView('monitoreoView');
  }

  function loadRegistroMenores() {
    const view = document.getElementById('registroView');
    view.innerHTML = `
      <h1 class="page-title">Registro de Menores</h1>
      <form class="form-container">
        <div class="form-group"><label>Nombre completo</label><input type="text" /></div>
        <div class="form-group"><label>RUT</label><input type="text" /></div>
        <div class="form-group"><label>Parentesco</label><input type="text" /></div>
        <div class="form-group"><label>Documento adjunto</label><input type="file" /></div>
        <button>Registrar</button>
      </form>
    `;
    showView('registroView');
  }

  // Transportista
  function loadTransportistaDashboard() {
    const view = document.getElementById('dashboardView');
    view.innerHTML = `
      <h1 class="page-title">Panel de Transportista</h1>
      <div class="cards-container">
        <div class="card"><h2 class="card-title">Vehículos Registrados</h2><div class="card-value">5</div></div>
        <div class="card"><h2 class="card-title">Pedidos en Tránsito</h2><div class="card-value">2</div></div>
        <div class="card"><h2 class="card-title">Validaciones Pendientes</h2><div class="card-value">1</div></div>
      </div>
    `;
    showView('dashboardView');
  }

  function loadTrackingPedidos() {
    const view = document.getElementById('trackingView');
    view.innerHTML = `
      <h1 class="page-title">Tracking de Pedidos</h1>
      <div class="table-container">
        <table class="table">
          <thead><tr><th>ID</th><th>Producto</th><th>Origen</th><th>Destino</th><th>Estado</th><th>Último Registro</th></tr></thead>
          <tbody>
            <tr><td>#000212</td><td>Contenedor 40ft</td><td>Puerto Valparaíso</td><td>Santiago</td><td><span class="status status-active">En ruta</span></td><td>Km 101</td></tr>
            <tr><td>#000213</td><td>Equipos electrónicos</td><td>San Antonio</td><td>Renca</td><td><span class="status status-pending">Pendiente validación</span></td><td>Bodega Central</td></tr>
          </tbody>
        </table>
      </div>
    `;
    showView('trackingView');
  }

  function loadRegistroVehiculos() {
    const view = document.getElementById('vehiculosView');
    view.innerHTML = `
      <h1 class="page-title">Pre-Registro de Vehículos</h1>
      <form class="form-container">
        <div class="form-group"><label>Patente</label><input type="text" /></div>
        <div class="form-group"><label>Marca</label><input type="text" /></div>
        <div class="form-group"><label>Modelo</label><input type="text" /></div>
        <div class="form-group"><label>Tipo de carga</label><input type="text" /></div>
        <button>Registrar Vehículo</button>
      </form>
    `;
    showView('vehiculosView');
  }

  function loadSubidaDocumentos() {
    const view = document.getElementById('documentosView');
    view.innerHTML = `
      <h1 class="page-title">Subir Documentos</h1>
      <form class="form-container">
        <div class="form-group"><label>Tipo de Documento</label><select><option>Factura</option><option>Guía</option><option>Certificado</option></select></div>
        <div class="form-group"><label>Archivo</label><input type="file" /></div>
        <button>Subir Documento</button>
      </form>
    `;
    showView('documentosView');
  }
});

