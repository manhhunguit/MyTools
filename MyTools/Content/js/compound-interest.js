$(document).ready(function () {
    function CompoundInterest1ViewModel() {
        var self = this;

        self.showCompoundInterest2 = ko.observable(false);

        self.initialCapital = ko.observable(null);
        self.interest = ko.observable(null);
        self.period = ko.observable("12");
        self.periods = ko.observable("5");

        self.initialCapitalHasError = ko.observable(false);
        self.interestHasError = ko.observable(false);
        self.periodHasError = ko.observable(false);
        self.periodsHasError = ko.observable(false);

        self.result = ko.observableArray([]);
        self.totalPeriods = ko.observable(null);
        self.closingCapital = ko.observable(null);

        self.showDualCompoundInterests = function () {
            var showCI2 = self.showCompoundInterest2();
            self.showCompoundInterest2(!showCI2);
            compoundInterest2.showCompoundInterest2(!showCI2);
        };

        self.toAmount = function (amount) {
            var numberFormat = new Intl.NumberFormat('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2
            });
            return numberFormat.format(amount);
        };

        self.toNumber = function (number) {
            var numberFormat = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return numberFormat.format(number);
        };

        self.parseInt = function (value) {
            var newValue = value.replace(new RegExp(",", "g"), "");
            return parseInt(newValue);
        };

        self.validate = function () {
            var isValid = true;

            if (!self.initialCapital()) {
                self.initialCapitalHasError(true);
                isValid = false;
            }
            else {
                self.initialCapitalHasError(false);
            }

            if (!self.interest()) {
                self.interestHasError(true);
                isValid = false;
            }
            else {
                self.interestHasError(false);
            }

            if (!self.period()) {
                self.periodHasError(true);
                isValid = false;
            } else {
                self.periodHasError(false);
            }

            if (!self.periods()) {
                self.periodsHasError(true);
                isValid = false;
            } else {
                self.periodsHasError(false);
            }

            return isValid;
        };

        self.calculate = function () {
            var result = [];

            if (self.validate()) {
                var openingCapital = self.parseInt(self.initialCapital());
                var interest = self.parseInt(self.interest());
                var closingCapital = 0;

                for (var i = 0; i < self.periods() ; i++) {
                    closingCapital = openingCapital + self.calculateClosingCapital(openingCapital, interest);

                    result.push({
                        period: 'Period ' + (i + 1),
                        openingCapital: self.toAmount(openingCapital),
                        closingCapital: self.toAmount(closingCapital)
                    });

                    openingCapital = closingCapital;

                    if (i == self.periods() - 1) {
                        var totalPeriods = self.parseInt(self.period()) * self.parseInt(self.periods());
                        self.totalPeriods(self.toNumber(totalPeriods));
                        self.closingCapital(self.toAmount(closingCapital));
                    }
                }
                self.result(result);
            } else {
                self.result([]);
            }
        };

        self.calculateClosingCapital = function (openingCapital, interest) {
            var closingCapital = openingCapital * interest / 100;
            return parseFloat(closingCapital.toString());
        };

        self.reset = function () {
            self.initialCapital(null);
            self.interest(null);
            self.period("12");
            self.periods("5");

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
        self.period = ko.observable("12");
        self.periods = ko.observable("5");

        self.initialCapitalHasError = ko.observable(false);
        self.interestHasError = ko.observable(false);
        self.periodHasError = ko.observable(false);
        self.periodsHasError = ko.observable(false);

        self.result = ko.observableArray([]);
        self.totalPeriods = ko.observable(null);
        self.closingCapital = ko.observable(null);

        self.toAmount = function (amount) {
            var numberFormat = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            return numberFormat.format(amount);
        };

        self.toNumber = function (number) {
            var numberFormat = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return numberFormat.format(number);
        };

        self.parseInt = function (value) {
            var newValue = value.replace(new RegExp(",", "g"), "");
            return parseInt(newValue);
        };

        self.validate = function () {
            var isValid = true;

            if (!self.initialCapital()) {
                self.initialCapitalHasError(true);
                isValid = false;
            }
            else {
                self.initialCapitalHasError(false);
            }

            if (!self.interest()) {
                self.interestHasError(true);
                isValid = false;
            }
            else {
                self.interestHasError(false);
            }

            if (!self.period()) {
                self.periodHasError(true);
                isValid = false;
            } else {
                self.periodHasError(false);
            }

            if (!self.periods()) {
                self.periodsHasError(true);
                isValid = false;
            } else {
                self.periodsHasError(false);
            }

            return isValid;
        };

        self.calculate = function () {
            var result = [];

            if (self.validate()) {
                var openingCapital = self.parseInt(self.initialCapital());
                var interest = self.parseInt(self.interest());
                var closingCapital = 0;

                for (var i = 0; i < self.periods() ; i++) {
                    closingCapital = openingCapital + self.calculateClosingCapital(openingCapital, interest);

                    result.push({
                        period: 'Period ' + (i + 1),
                        openingCapital: self.toAmount(openingCapital),
                        closingCapital: self.toAmount(closingCapital)
                    });

                    openingCapital = closingCapital;

                    if (i == self.periods() - 1) {
                        var totalPeriods = self.parseInt(self.period()) * self.parseInt(self.periods());
                        self.totalPeriods(self.toNumber(totalPeriods));
                        self.closingCapital(self.toAmount(closingCapital));
                    }
                }
                self.result(result);
            } else {
                self.result([]);
            }
        };

        self.calculateClosingCapital = function (openingCapital, interest) {
            var closingCapital = openingCapital * interest / 100;
            return parseFloat(closingCapital.toString());
        };

        self.reset = function () {
            self.initialCapital(null);
            self.interest(null);
            self.period("12");
            self.periods("5");

            self.initialCapitalHasError(false);
            self.interestHasError(false);
            self.periodHasError(false);
            self.periodsHasError(false);

            self.result([]);
        };
    };

    $(".initial-capital").mask("#,##0", { reverse: true });
    $(".interest").mask("#,##0", { reverse: true });
    $(".period").mask("#,##0", { reverse: true });
    $(".periods").mask("#,##0", { reverse: true });

    var compoundInterest1 = new CompoundInterest1ViewModel();
    var compoundInterest2 = new CompoundInterest2ViewModel();

    ko.applyBindings(compoundInterest1, document.getElementById("compound-interest-1"));
    ko.applyBindings(compoundInterest2, document.getElementById("compound-interest-2"));
});