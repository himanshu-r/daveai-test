function appData() {
    return {
      showForm: false,
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      mobile: '',
      city: '',
      pincode: '',
      validationErrors: {},
      persons: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      sortKey: '',
      sortOrder: 'asc',
      get totalPages() {
        return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
      },
      get filteredPersons() {
        const query = this.searchQuery.toLowerCase().trim();
        return this.persons.filter(person =>
          person.firstName.toLowerCase().includes(query) ||
          person.lastName.toLowerCase().includes(query) ||
          person.email.toLowerCase().includes(query) ||
          person.city.toLowerCase().includes(query)
        );
      },
      addPerson() {
        if (this.validateForm()) {
          this.persons.push({
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            email: this.email,
            mobile: this.mobile,
            city: this.city,
            pincode: this.pincode
          });
          this.resetForm();
        }
      },
      resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.dob = '';
        this.email = '';
        this.mobile = '';
        this.city = '';
        this.pincode = '';
        this.validationErrors = {};
      },
      validateForm() {
        this.validationErrors = {};

        if (!this.firstName) {
          this.validationErrors.firstName = 'First Name is required';
        }

        if (!this.lastName) {
          this.validationErrors.lastName = 'Last Name is required';
        }

        if (!this.dob) {
          this.validationErrors.dob = 'Date of Birth is required';
        } else {
          const today = new Date();
          const birthDate = new Date(this.dob);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 18) {
            this.validationErrors.dob = 'Age must be at least 18 years';
          }
        }

        if (!this.email) {
          this.validationErrors.email = 'Email is required';
        } else if (!this.validateEmail(this.email)) {
          this.validationErrors.email = 'Invalid email format';
        }

        if (!this.mobile) {
          this.validationErrors.mobile = 'Mobile is required';
        } else if (!this.validateMobile(this.mobile)) {
          this.validationErrors.mobile = 'Invalid mobile number format';
        }

        if (!this.city) {
          this.validationErrors.city = 'City is required';
        }

        if (!this.pincode) {
          this.validationErrors.pincode = 'Pincode is required';
        } else if (!this.validatePincode(this.pincode)) {
          this.validationErrors.pincode = 'Invalid pincode format';
        }

        return Object.keys(this.validationErrors).length === 0;
      },
      validateEmail(email) {
        // Custom email validation logic here
        return /\S+@\S+\.\S+/.test(email);
      },
      validateMobile(mobile) {
        // Custom mobile validation logic here
        return /^\d{10}$/.test(mobile);
      },
      validatePincode(pincode) {
        // Custom pincode validation logic here
        return /^\d{6}$/.test(pincode);
      },
      sort(key) {
        if (key === this.sortKey) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortOrder = 'asc';
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    };
  }