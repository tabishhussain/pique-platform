from __future__ import division
import string

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def validate_password_strength(value):
    has_uppercase, has_lowercase, has_numbers, has_special_characters = False, False, False, False

    for character in value:
        if character.isupper():
            has_uppercase = True
        elif character.islower():
            has_lowercase = True
        elif character.isdigit():
            has_numbers = True
        elif character in string.punctuation:
            has_special_characters = True

    num_types_of_characters = sum([has_uppercase, has_lowercase, has_numbers, has_special_characters])

    if len(value) < 8 or num_types_of_characters < 3:
        raise ValidationError(_("Must be at least 8 characters in length "
                                "and contain at least 3 of the following 4 types of characters: "
                                "lower case letters (i.e. a-z), "
                                "upper case letters (i.e. A-Z), "
                                "numbers (i.e. 0-9), "
                                "special characters (e.g. -=[]\;,./~!@#$%^&*()_+{}|:<>?)\")"))
