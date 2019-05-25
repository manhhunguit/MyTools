$(document).ready(function () {
    function CompoundInterest1ViewModel() {
        var self = this;

        self.showCompoundInterest2 = ko.observable(false);

        self.initialCapital = ko.observable(null);
        self.interest = ko.observable(null);
        self.period = ko.observable(12);
        self.periods = ko.observable(5);

        self.initialCapitalHasError = ko.observable(false);
        self.interestHasError = ko.observable(false);
        self.periodHasError = ko.observable(false);
        self.periodsHasError = ko.observable(false);

        self.result = ko.observableArray([]);
        self.totalPeriods = ko.computed(function () { return self.period() * self.periods(); });
        self.closingCapital = ko.observable(null);

        self.showDualCompoundInterests = function () {
            var showCI2 = self.showCompoundInterest2();
            self.showCompoundInterest2(!showCI2);
            compoundInterest2.showCompoundInterest2(!showCI2);
        };

        self.isInteger = function (string) {
            var number = parseFloat(string);
            return Number.isInteger(number);
        };

        self.toAmount = function (amount) {
            var numberFormat = new Intl.NumberFormat('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2
            });
            return numberFormat.format(amount);    
        };

        self.validate = function () {
            var isValid = true;

            if (!self.initialCapital() || !self.isInteger(self.initialCapital()) || self.initialCapital() <= 0) {
                self.initialCapitalHasError(true);
                isValid = false;
            }
            else {
                self.initialCapitalHasError(false);
            }

            if (!self.interest() || self.interest() <= 0) {
                self.interestHasError(true);
                isValid = false;
            }
            else {
                self.interestHasError(false);
            }

            if (!self.period() || !self.isInteger(self.period()) || self.period() <= 0) {
                self.periodHasError(true);
                isValid = false;
            } else {
                self.periodHasError(false);
            }

            if (!self.periods() || !self.isInteger(self.periods()) || self.periods() <= 0) {
                self.periodsHasError(true);
                isValid = false;
            } else {
                self.periodsHasError(false);
            }

            return isValid;
        };

        self.calculate = function () {
            var result = [];
            var openingCapital = parseInt(self.initialCapital());
            var closingCapital = 0;
            if (self.validate()) {
                for (var i = 0; i < self.periods() ; i++) {
                    closingCapital = openingCapital + self.calculateClosingCapital(openingCapital, self.interest());

                    result.push({
                        period: 'Period ' + (i + 1),
                        openingCapital: self.toAmount(openingCapital),
                        closingCapital: self.toAmount(closingCapital)
                    });

                    openingCapital = closingCapital;

                    if (i == self.periods() - 1) {
                        self.closingCapital(self.toAmount(closingCapital));
                    }
                }
                self.result(result);
            } else {
                self.result([]);
            }
        };

        self.calculateClosingCapital = function (openingCapital, interest) {
            var closingCapital = openingCapital * self.interest() / 100;
            return parseFloat(closingCapital.toString());
        };

        self.reset = function () {
            self.initialCapital(null);
            self.interest(null);
            self.period(12);
            self.periods(5);

            self.initialCapitalHasError(false);
            self.interestHasError(false);
            self.periodHasError(false);
            self.periodsHasError(false);

            self.result([]);
        };
    };

    function CompoundInterest2ViewModel() {
        var self = this;

        self.showCompoundInterest2 = ko.observable(false);

        self.initialCapital = ko.observable(null);
        self.interest = ko.observable(null);
        self.period = ko.observable(12);
        self.periods = ko.observable(5);

        self.initialCapitalHasError = ko.observable(false);
        self.interestHasError = ko.observable(false);
        self.periodHasError = ko.observable(false);
        self.periodsHasError = ko.observable(false);

        self.result = ko.observableArray([]);
        self.totalPeriods = ko.computed(function () { return self.period() * self.periods(); });
        self.closingCapital = ko.observable(null);

        self.isInteger = function (string) {
            var number = parseFloat(string);
            return Number.isInteger(number);
        };

        self.toAmount = function (amount) {
            var numberFormat = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            return numberFormat.format(amount);
        };

        self.validate = function () {
            var isValid = true;

            if (!self.initialCapital() || !self.isInteger(self.initialCapital()) || self.initialCapital() <= 0) {
                self.initialCapitalHasError(true);
                isValid = false;
            }
            else {
                self.initialCapitalHasError(false);
            }

            if (!self.interest() || self.interest() <= 0) {
                self.interestHasError(true);
                isValid = false;
            }
            else {
                self.interestHasError(false);
            }

            if (!self.period() || !self.isInteger(self.period()) || self.period() <= 0) {
                self.periodHasError(true);
                isValid = false;
            } else {
                self.periodHasError(false);
            }

            if (!self.periods() || !self.isInteger(self.periods()) || self.periods() <= 0) {
                self.periodsHasError(true);
                isValid = false;
            } else {
                self.periodsHasError(false);
            }

            return isValid;
        };

        self.calculate = function () {
            var result = [];
            var openingCapital = parseInt(self.initialCapital());
            var closingCapital = 0;
            if (self.validate()) {
                for (var i = 0; i < self.periods() ; i++) {
                    closingCapital = openingCapital + self.calculateClosingCapital(openingCapital, self.interest());

                    result.push({
                        period: 'Period ' + (i + 1),
                        openingCapital: self.toAmount(openingCapital),
                        closingCapital: self.toAmount(closingCapital)
                    });

                    openingCapital = closingCapital;

                    if (i == self.periods() - 1) {
                        self.closingCapital(self.toAmount(closingCapital));
                    }
                }
                self.result(result);
            } else {
                self.result([]);
            }
        };

        self.calculateClosingCapital = function (openingCapital, interest) {
            var closingCapital = openingCapital * self.interest() / 100;
            return parseFloat(closingCapital.toString());
        };

        self.reset = function () {
            self.initialCapital(null);
            self.interest(null);
            self.period(12);
            self.periods(5);

            self.initialCapitalHasError(false);
            self.interestHasError(false);
            self.periodHasError(false);
            self.periodsHasError(false);

            self.result([]);
        };
    };

    var compoundInterest1 = new CompoundInterest1ViewModel();
    var compoundInterest2 = new CompoundInterest2ViewModel();

    ko.applyBindings(compoundInterest1, document.getElementById("compound-interest-1"));
    ko.applyBindings(compoundInterest2, document.getElementById("compound-interest-2"));
});