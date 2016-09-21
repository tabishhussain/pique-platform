import unittest
from django.conf import settings
from django.test import TestCase, override_settings
from mock import patch, Mock
import os


class TestComprehensiveThemeLocale(TestCase):
    """
    Test Comprehensive Theme Locales
    """

    def setUp(self):
        super(TestComprehensiveThemeLocale, self).setUp()

    def test_theme_locale_path_in_settings(self):
        """
        test comprehensive theming paths in settings.
        """
        self.assertTrue('/edx/app/edxapp/edx-platform/themes/conf/locale' in settings.LOCALE_PATHS)

    def test_theme_locale_path(self):
        """
        test comprehensive theming directory path.
        """
        self.assertTrue(os.path.exists("/edx/app/edxapp/edx-platform/themes/conf/locale"))
