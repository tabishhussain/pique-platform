;(function (define, undefined) {
    'use strict';
    define([
        'gettext',
        'jquery',
        'underscore',
        'backbone',
        'edx-ui-toolkit/js/utils/html-utils',
        'js/student_account/views/account_section_view',
        'text!templates/student_account/account_settings_mobile.underscore'
    ], function (gettext, $, _, Backbone, HtmlUtils, AccountSectionView, accountSettingsTemplate) {

        var AccountSettingsView = Backbone.View.extend({

            initialize: function (options) {
                this.options = options;
                _.bindAll(this, 'render', 'renderFields', 'showLoadingError');
            },

            render: function () {
                HtmlUtils.setHtml(this.$el, HtmlUtils.template(accountSettingsTemplate)({
                    accountSettingsTabs: this.accountSettingsTabs
                }));
                this.renderSection(this.options.tabSections);
                return this;
            },


            renderSection: function (tabSections) {
                var accountSectionView = new AccountSectionView({
                    activeTabName: '',
                    sections: tabSections,
                    el: '.account-settings-sections'
                });

                accountSectionView.render();
            },

            renderFields: function () {
                var view = this;
                view.$('.ui-loading-indicator').addClass('is-hidden');

                _.each(view.$('.account-settings-section-body'), function (sectionEl, index) {
                    _.each(view.options.tabSections[index].fields, function (field) {
                        if (field.view.enabled) {
                            $(sectionEl).append(field.view.render().el);
                        }
                    });
                });
                return this;
            },

            showLoadingError: function () {
                this.$('.ui-loading-indicator').addClass('is-hidden');
                this.$('.ui-loading-error').removeClass('is-hidden');
            }
        });

        return AccountSettingsView;
    });
}).call(this, define || RequireJS.define);
