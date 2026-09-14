import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Incident {
  id: string;
  caller: string;
  contact: string;
  type: string;
  location: string;
  priority: string;
  description: string;
  resources: string;
  status: string;
  date: string;
}

interface Vehicle {
  id: string;
  type: string;
  department: string;
  driver: string;
  status: string;
  location: string;
}

interface InventoryItem {
  id: number;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  reorder: number;
}

interface CaseItem {
  id: string;
  title: string;
  location: string;
  priority: string;
  department: string;
  vehicle: string;
  status: string;
  updated: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  /* =====================================================
     NAVIGATION
  ===================================================== */

  currentPage = 'Dashboard';

  menuItems = [
    { name: 'Dashboard', icon: '▦', section: 'Operations' },
    { name: 'Active Calls', icon: '☎', section: 'Operations' },
    { name: 'Call Queue', icon: '☷', section: 'Operations' },
    { name: 'Incidents', icon: '⚠', section: 'Operations' },
    { name: 'Dispatch', icon: '➤', section: 'Operations' },
    { name: 'Monitoring', icon: '◉', section: 'Operations' },

    { name: 'Incident Recording', icon: '▤', section: 'Field Resource Tracking' },
    { name: 'Vehicle Monitoring', icon: '▣', section: 'Field Resource Tracking' },
    { name: 'Inventory Monitoring', icon: '▥', section: 'Field Resource Tracking' },
    { name: 'Case Status Tracking', icon: '✓', section: 'Field Resource Tracking' },

    { name: 'Call Records', icon: '▤', section: 'Records' },
    { name: 'Reports', icon: '▧', section: 'Records' }
  ];

  get operations() {
    return this.menuItems.filter(item => item.section === 'Operations');
  }

  get fieldResources() {
    return this.menuItems.filter(
      item => item.section === 'Field Resource Tracking'
    );
  }

  get records() {
    return this.menuItems.filter(
      item => item.section === 'Records'
    );
  }

  showPage(page: string) {
    this.currentPage = page;
    this.closeModal();
  }

  get pageTitle(): string {
    return this.currentPage === 'Dashboard'
      ? 'Emergency Operations Dashboard'
      : this.currentPage;
  }


  /* =====================================================
     SAMPLE DATA
  ===================================================== */

  incidents: Incident[] = [
    {
      id: 'INC-2026-001',
      caller: 'Maria Santos',
      contact: '09171234567',
      type: 'Medical Emergency',
      location: 'Brgy. Marungko',
      priority: 'High',
      description: 'Patient experiencing difficulty breathing.',
      resources: 'Ambulance',
      status: 'Dispatched',
      date: '2026-09-11 17:32'
    },
    {
      id: 'INC-2026-002',
      caller: 'Juan Dela Cruz',
      contact: '09181234567',
      type: 'Road Accident',
      location: 'Brgy. Laog',
      priority: 'Medium',
      description: 'Two vehicles involved in road accident.',
      resources: 'Rescue Vehicle',
      status: 'Responding',
      date: '2026-09-11 17:20'
    }
  ];

  vehicles: Vehicle[] = [
    {
      id: 'AMB-01',
      type: 'Ambulance',
      department: 'Municipal Health Office',
      driver: 'R. Santos',
      status: 'Available',
      location: 'EOC Station'
    },
    {
      id: 'RES-02',
      type: 'Rescue Vehicle',
      department: 'MDRRMO',
      driver: 'J. Garcia',
      status: 'Dispatched',
      location: 'Brgy. Laog'
    },
    {
      id: 'FIR-01',
      type: 'Fire Truck',
      department: 'BFP',
      driver: 'M. Cruz',
      status: 'Responding',
      location: 'Brgy. Sta. Cruz'
    },
    {
      id: 'PAT-03',
      type: 'Patrol Vehicle',
      department: 'PNP',
      driver: 'A. Reyes',
      status: 'In Use',
      location: 'Brgy. Donacion'
    },
    {
      id: 'AMB-02',
      type: 'Ambulance',
      department: 'Municipal Health Office',
      driver: 'L. Mendoza',
      status: 'Maintenance',
      location: 'Municipal Garage'
    }
  ];

  inventory: InventoryItem[] = [
    {
      id: 1,
      item: 'First Aid Kit',
      category: 'Medical',
      quantity: 24,
      unit: 'kits',
      reorder: 10
    },
    {
      id: 2,
      item: 'Oxygen Tank',
      category: 'Medical',
      quantity: 7,
      unit: 'tanks',
      reorder: 5
    },
    {
      id: 3,
      item: 'Emergency Blanket',
      category: 'Rescue',
      quantity: 42,
      unit: 'pcs',
      reorder: 15
    },
    {
      id: 4,
      item: 'Flashlight',
      category: 'Equipment',
      quantity: 8,
      unit: 'pcs',
      reorder: 10
    },
    {
      id: 5,
      item: 'Water Container',
      category: 'Relief',
      quantity: 0,
      unit: 'pcs',
      reorder: 10
    }
  ];

  cases: CaseItem[] = [
    {
      id: 'CASE-001',
      title: 'Medical Emergency',
      location: 'Brgy. Marungko',
      priority: 'High',
      department: 'Municipal Health Office',
      vehicle: 'AMB-01',
      status: 'Dispatched',
      updated: '5 minutes ago'
    },
    {
      id: 'CASE-002',
      title: 'Road Accident',
      location: 'Brgy. Laog',
      priority: 'Medium',
      department: 'MDRRMO',
      vehicle: 'RES-02',
      status: 'Responding',
      updated: '12 minutes ago'
    },
    {
      id: 'CASE-003',
      title: 'Fire Incident',
      location: 'Brgy. Sta. Cruz',
      priority: 'High',
      department: 'BFP',
      vehicle: 'FIR-01',
      status: 'Monitoring',
      updated: '18 minutes ago'
    },
    {
      id: 'CASE-004',
      title: 'Security Concern',
      location: 'Brgy. Paltok',
      priority: 'Normal',
      department: 'PNP',
      vehicle: 'PAT-03',
      status: 'Resolved',
      updated: '35 minutes ago'
    }
  ];

  selectedCaseId = 'CASE-001';


  /* =====================================================
     SEARCH / FILTER
  ===================================================== */

  incidentSearch = '';
  incidentPriority = '';

  vehicleSearch = '';
  vehicleStatus = '';

  inventorySearch = '';
  inventoryCategory = '';

  caseSearch = '';


  /* =====================================================
     MODAL
  ===================================================== */

  modalOpen = false;
  modalType = '';

  selectedIncident: Incident | null = null;
  selectedVehicle: Vehicle | null = null;
  selectedInventory: InventoryItem | null = null;


  /* =====================================================
     FORM DATA
  ===================================================== */

  incidentForm: Incident = {
    id: '',
    caller: '',
    contact: '',
    type: '',
    location: '',
    priority: '',
    description: '',
    resources: '',
    status: 'Pending',
    date: ''
  };

  vehicleForm: Vehicle = {
    id: '',
    type: '',
    department: '',
    driver: '',
    status: 'Available',
    location: ''
  };

  inventoryForm: InventoryItem = {
    id: 0,
    item: '',
    category: '',
    quantity: 0,
    unit: '',
    reorder: 0
  };

  stockForm = {
    quantity: 0,
    reorder: 0
  };

  statusForm = '';


  /* =====================================================
     TOAST
  ===================================================== */

  toastVisible = false;
  toastMessage = '';

  showMessage(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 2200);
  }


  /* =====================================================
     INCIDENT RECORDING
  ===================================================== */

  get filteredIncidents(): Incident[] {
    const search = this.incidentSearch.toLowerCase();

    return this.incidents.filter(item => {

      const matchesSearch =
        item.id.toLowerCase().includes(search) ||
        item.caller.toLowerCase().includes(search) ||
        item.type.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search);

      const matchesPriority =
        this.incidentPriority === '' ||
        item.priority === this.incidentPriority;

      return matchesSearch && matchesPriority;
    });
  }

  get highPriorityIncidents() {
    return this.incidents.filter(
      item => item.priority === 'High'
    ).length;
  }

  get dispatchedIncidents() {
    return this.incidents.filter(
      item => item.status === 'Dispatched'
    ).length;
  }

  get respondingIncidents() {
    return this.incidents.filter(
      item => item.status === 'Responding'
    ).length;
  }

  openIncidentForm() {

    this.incidentForm = {
      id: '',
      caller: '',
      contact: '',
      type: '',
      location: '',
      priority: '',
      description: '',
      resources: '',
      status: 'Pending',
      date: ''
    };

    this.modalType = 'incident-form';
    this.modalOpen = true;
  }

  saveIncident() {

    const nextNumber =
      String(this.incidents.length + 1).padStart(3, '0');

    const newIncident: Incident = {
      ...this.incidentForm,
      id: `INC-2026-${nextNumber}`,
      date: new Date().toLocaleString('en-PH')
    };

    this.incidents.unshift(newIncident);

    this.closeModal();

    this.showMessage('Incident recorded successfully');
  }

  viewIncident(incident: Incident) {
    this.selectedIncident = incident;
    this.modalType = 'incident-view';
    this.modalOpen = true;
  }


  /* =====================================================
     VEHICLE MONITORING
  ===================================================== */

  get filteredVehicles(): Vehicle[] {

    const search = this.vehicleSearch.toLowerCase();

    return this.vehicles.filter(vehicle => {

      const matchesSearch =
        vehicle.id.toLowerCase().includes(search) ||
        vehicle.type.toLowerCase().includes(search) ||
        vehicle.department.toLowerCase().includes(search) ||
        vehicle.driver.toLowerCase().includes(search) ||
        vehicle.location.toLowerCase().includes(search);

      const matchesStatus =
        this.vehicleStatus === '' ||
        vehicle.status === this.vehicleStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get availableVehicles() {
    return this.vehicles.filter(
      v => v.status === 'Available'
    ).length;
  }

  get dispatchedVehicles() {
    return this.vehicles.filter(
      v => v.status === 'Dispatched'
    ).length;
  }

  get respondingVehicles() {
    return this.vehicles.filter(
      v => v.status === 'Responding'
    ).length;
  }

  get maintenanceVehicles() {
    return this.vehicles.filter(
      v => v.status === 'Maintenance'
    ).length;
  }

  openVehicleForm() {

    this.vehicleForm = {
      id: '',
      type: '',
      department: '',
      driver: '',
      status: 'Available',
      location: ''
    };

    this.modalType = 'vehicle-form';
    this.modalOpen = true;
  }

  saveVehicle() {

    const newVehicle: Vehicle = {
      ...this.vehicleForm,
      id: this.vehicleForm.id.toUpperCase()
    };

    this.vehicles.push(newVehicle);

    this.closeModal();

    this.showMessage('Vehicle added successfully');
  }

  openVehicleUpdate(vehicle: Vehicle) {

    this.selectedVehicle = vehicle;

    this.vehicleForm = {
      ...vehicle
    };

    this.modalType = 'vehicle-update';
    this.modalOpen = true;
  }

  updateVehicle() {

    if (!this.selectedVehicle) return;

    const index = this.vehicles.findIndex(
      v => v.id === this.selectedVehicle!.id
    );

    if (index !== -1) {

      this.vehicles[index] = {
        ...this.vehicleForm,
        id: this.selectedVehicle.id
      };
    }

    this.closeModal();

    this.showMessage('Vehicle information updated');
  }


  /* =====================================================
     INVENTORY MONITORING
  ===================================================== */

  getInventoryStatus(item: InventoryItem): string {

    if (item.quantity === 0) {
      return 'Out of Stock';
    }

    if (item.quantity <= item.reorder) {
      return 'Low Stock';
    }

    return 'Available';
  }

  get filteredInventory(): InventoryItem[] {

    const search = this.inventorySearch.toLowerCase();

    return this.inventory.filter(item => {

      const matchesSearch =
        item.item.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);

      const matchesCategory =
        this.inventoryCategory === '' ||
        item.category === this.inventoryCategory;

      return matchesSearch && matchesCategory;
    });
  }

  get availableInventory() {
    return this.inventory.filter(
      i => this.getInventoryStatus(i) === 'Available'
    ).length;
  }

  get lowInventory() {
    return this.inventory.filter(
      i => this.getInventoryStatus(i) === 'Low Stock'
    ).length;
  }

  get outInventory() {
    return this.inventory.filter(
      i => this.getInventoryStatus(i) === 'Out of Stock'
    ).length;
  }

  openInventoryForm() {

    this.inventoryForm = {
      id: 0,
      item: '',
      category: '',
      quantity: 0,
      unit: '',
      reorder: 0
    };

    this.modalType = 'inventory-form';
    this.modalOpen = true;
  }

  saveInventory() {

    const newItem: InventoryItem = {
      ...this.inventoryForm,
      id: Date.now()
    };

    this.inventory.push(newItem);

    this.closeModal();

    this.showMessage('Inventory item added');
  }

  openStockUpdate(item: InventoryItem) {

    this.selectedInventory = item;

    this.stockForm = {
      quantity: item.quantity,
      reorder: item.reorder
    };

    this.modalType = 'stock-update';
    this.modalOpen = true;
  }

  updateStock() {

    if (!this.selectedInventory) return;

    const item = this.inventory.find(
      i => i.id === this.selectedInventory!.id
    );

    if (item) {

      item.quantity = Number(
        this.stockForm.quantity
      );

      item.reorder = Number(
        this.stockForm.reorder
      );
    }

    this.closeModal();

    this.showMessage('Stock information updated');
  }


  /* =====================================================
     CASE STATUS TRACKING
  ===================================================== */

  get filteredCases(): CaseItem[] {

    const search = this.caseSearch.toLowerCase();

    return this.cases.filter(item => {

      return (
        item.id.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search) ||
        item.department.toLowerCase().includes(search)
      );

    });
  }

  get selectedCase(): CaseItem | undefined {

    return this.cases.find(
      c => c.id === this.selectedCaseId
    );
  }

  selectCase(id: string) {
    this.selectedCaseId = id;
  }

  openCaseStatus(item: CaseItem) {

    this.selectedCaseId = item.id;
    this.statusForm = item.status;

    this.modalType = 'case-status';
    this.modalOpen = true;
  }

  updateCaseStatus() {

    const item = this.cases.find(
      c => c.id === this.selectedCaseId
    );

    if (!item) return;

    item.status = this.statusForm;
    item.updated = 'Just now';

    this.closeModal();

    this.showMessage('Case status updated');
  }

  get timelineSteps() {

    return [
      {
        title: 'Incident Recorded',
        description: 'Incident information was recorded by the dispatcher.'
      },
      {
        title: 'Dispatched',
        description: 'Emergency resources were assigned to the case.'
      },
      {
        title: 'Responding',
        description: 'Assigned vehicle is responding to the incident.'
      },
      {
        title: 'Monitoring',
        description: 'Dispatcher is monitoring the situation.'
      },
      {
        title: 'Resolved',
        description: 'Case has been resolved and resources released.'
      }
    ];
  }

  isTimelineComplete(index: number): boolean {

    const item = this.selectedCase;

    if (!item) return false;

    const statuses = [
      'Incident Recorded',
      'Dispatched',
      'Responding',
      'Monitoring',
      'Resolved'
    ];

    const currentIndex =
      statuses.indexOf(item.status);

    return currentIndex >= index;
  }


  /* =====================================================
     MODAL
  ===================================================== */

  closeModal() {
    this.modalOpen = false;
    this.modalType = '';
  }


  /* =====================================================
     DASHBOARD
  ===================================================== */

  get activeCalls() {
    return 2;
  }

  get queueCount() {
    return 3;
  }

  get openIncidents() {
    return this.incidents.filter(
      i => i.status !== 'Resolved'
    ).length + 15;
  }

  notify() {
    this.showMessage(
      'No new system notifications'
    );
  }

}