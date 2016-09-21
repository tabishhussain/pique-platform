"""
Tests for Themeing locales
"""

from django.conf import settings
from django.test import TestCase
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
        self.assertIn('/edx/app/edxapp/edx-platform/themes/conf/locale', settings.LOCALE_PATHS)  # pylint: disable=no-member

    def test_theme_locale_path_exist(self):
        """
        test comprehensive theming directory path exist.
        """
        self.assertTrue(os.path.exists("/edx/app/edxapp/edx-platform/themes/conf/locale"))
