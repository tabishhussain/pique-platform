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

    has_mix_of_letters_and_numbers = (has_uppercase or has_lowercase) and has_numbers
    has_mix_of_upper_and_lower_case_letters = has_uppercase and has_lowercase

    num_conditions_met = sum([has_mix_of_letters_and_numbers,
                              has_mix_of_upper_and_lower_case_letters,
                              has_special_characters])

    if len(value) < 8 or num_conditions_met < 2:
        raise ValidationError(_("Passwords must be at least 8 characters in length "
                                "and meet at least two of the following conditions: "
                                "Mix of letters and numbers "
                                "Mix of upper and lower case letters "
                                "Special characters (e.g. # & * ! $)"))
