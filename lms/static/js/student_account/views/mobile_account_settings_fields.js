;(function (define, undefined) {
    'use strict';
    define([
        'gettext',
        'jquery',
        'underscore',
        'backbone',
        'js/views/fields',
        'text!templates/fields/mobile_field_text_account.underscore',
        'text!templates/fields/mobile_field_readonly_account.underscore',
        'text!templates/fields/mobile_field_link_account.underscore',
        'text!templates/fields/mobile_field_dropdown_account.underscore',
        'edx-ui-toolkit/js/utils/string-utils',
        'edx-ui-toolkit/js/utils/html-utils'
    ], function (
        gettext, $, _, Backbone,
        FieldViews,
        field_text_account_template,
        field_readonly_account_template,
        field_link_account_template,
        field_dropdown_account_template,
        StringUtils,
        HtmlUtils
    )
    {

        var AccountSettingsFieldViews = {
            ReadonlyFieldView: FieldViews.ReadonlyFieldView.extend({
                fieldTemplate: field_readonly_account_template
            }),
            TextFieldView: FieldViews.TextFieldView.extend({
                fieldTemplate: field_text_account_template
            }),
            DropdownFieldView: FieldViews.DropdownFieldView.extend({
                fieldTemplate: field_dropdown_account_template
            }),
            EmailFieldView: FieldViews.TextFieldView.extend({
                fieldTemplate: field_text_account_template,
                successMessage: function () {
                    return HtmlUtils.joinHtml(
                        this.indicators.success,
                        StringUtils.interpolate(
                            gettext('We\'ve sent a confirmation message to {new_email_address}. Click the link in the message to update your email address.'), /* jshint ignore:line */
                            {'new_email_address': this.fieldValue()}
                        )
                    );
                }
            }),
            LanguagePreferenceFieldView: FieldViews.DropdownFieldView.extend({
                fieldTemplate: field_dropdown_account_template,
                saveSucceeded: function () {
                    var data = {
                        'language': this.modelValue()
                    };

                    var view = this;
                    $.ajax({
                        type: 'POST',
                        url: '/i18n/setlang/',
                        data: data,
                        dataType: 'html',
                        success: function () {
                            view.showSuccessMessage();
                        },
                        error: function () {
                            view.showNotificationMessage(
                                HtmlUtils.joinHtml(
                                    view.indicators.error,
                                    gettext('You must sign out and sign back in before your language changes take effect.') // jshint ignore:line
                                )
                            );
                        }
                    });
                }

            }),
            PasswordFieldView: FieldViews.LinkFieldView.extend({
                fieldType: 'button',
                fieldTemplate: field_link_account_template,
                events: {
                    'click button': 'linkClicked'
                },
                initialize: function (options) {
                    this.options = _.extend({}, options);
                    this._super(options);
                    _.bindAll(this, 'resetPassword');
                },
                linkClicked: function (event) {
                    event.preventDefault();
                    this.resetPassword(event);
                },
                resetPassword: function () {
                    var data = {};
                    data[this.options.emailAttribute] = this.model.get(this.options.emailAttribute);

                    var view = this;
                    $.ajax({
                        type: 'POST',
                        url: view.options.linkHref,
                        data: data,
                        success: function () {
                            view.showSuccessMessage();
                        },
                        error: function (xhr) {
                            view.showErrorMessage(xhr);
                        }
                    });
                },
                successMessage: function () {
                    return HtmlUtils.joinHtml(
                        this.indicators.success,
                        StringUtils.interpolate(
                            gettext('We\'ve sent a message to {email_address}. Click the link in the message to reset your password.'), /* jshint ignore:line */
                            {'email_address': this.model.get(this.options.emailAttribute)}
                        )
                    );
                }
            }),
            LanguageProficienciesFieldView: FieldViews.DropdownFieldView.extend({
                fieldTemplate: field_dropdown_account_template,
                modelValue: function () {
                    var modelValue = this.model.get(this.options.valueAttribute);
                    if (_.isArray(modelValue) && modelValue.length > 0) {
                        return modelValue[0].code;
                    } else {
                        return null;
                    }
                },
                saveValue: function () {
                    if (this.persistChanges === true) {
                        var attributes = {},
                            value = this.fieldValue() ? [{'code': this.fieldValue()}] : [];
                        attributes[this.options.valueAttribute] = value;
                        this.saveAttributes(attributes);
                    }
                }
            })
        };

        return AccountSettingsFieldViews;
    });
}).call(this, define || RequireJS.define);
