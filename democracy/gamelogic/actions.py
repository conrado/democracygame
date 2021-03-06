"""
This module contains the functions that implement the actions that a user can
take inside of the democracy game. Functionality in this module should not depend
on request objects. Scripts on the server the API views and other views 
should all call into this module to play the democracy game.

This module itself uses functions from the score.py and levels.py see if
an action is allowed and how it affects the score of the players / the democracy
world.

user_actions = get_actions( user )

use the role_to_actions dict to determine availability of actions for user

example usage
-------------

vote_func = role_to_actions[userprofile.role]['vote'] this will return the function required to do the 
vote for this user. If it returns a keyerror the action for this user does not excist.
"""

import logging
import datetime

from django.utils.translation import ugettext as _
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.contrib.contenttypes import generic
from django.contrib.contenttypes.models import ContentType

import score
import levels
from gamelogic.models import roles

from gamelogic.models import MultiplyIssue
from voting.models import Vote
from issue.models import Issue
from voting.models import possible_votes 


def vote(user, issue, direction, keep_private , api_interface=None ):
    """Unified voting (both blank and normal votes)."""
    #TODO anonymous voting?
    userprofile = user.get_profile()
    if not role_to_actions[userprofile.role].has_key('vote') : return

    repeated_vote, voted_already, new_vote = \
        Vote.objects.record_vote(user, issue, direction, keep_private,  api_interface )

    if repeated_vote: return
    
    logging.debug("User " + user.username + " voted " + unicode(new_vote.vote) + " on issue object with pk =" + unicode(issue.id) + ".")
    user.message_set.create(message="You voted successfully on %s" % issue.title  )

    score.vote(user, issue, direction, voted_already)
    levels.upgrade[userprofile.role](userprofile)

    return new_vote


def propose(user, title, body, direction, source_url,
            source_type=u"website", is_draft=False, issue_no=None):
    """ 
    Propose an issue into the game
    """
    if not issue_no:
        userprofile = user.get_profile()
        if not role_to_actions[userprofile.role].has_key('propose'): return 

        new_issue = Issue(
            title = title,
            url = source_url,
            source_type = source_type,
            body = body,
            user = user,
            is_draft = is_draft,
        )
        new_issue.save()

        user.message_set.create(message="You created issue \"%s\" successfully " % new_issue.title  )
        score.propose(user)
        levels.upgrade[userprofile.role](userprofile)
    else:
        # we are editing one TODO remove this possibility?
        issue = get_object_or_404(Issue, pk=issue_no)

        # Now change the issue and issue body to the appropriate values.
        issue.title = title
        issue.is_draft = is_draft
        issue.body = body
        issue.source_type = source_type
        issue.source_url = source_url
        issue.save()
        new_issue = issue

    Vote.objects.record_vote(user , new_issue, direction,)    

    return new_issue

def multiply(user, issue, downgrade=False ):
    """
    Opinion leaders have the option to mutiply the values of issues. 
    at most X multyplies can be given.
    """
    userprofile = user.get_profile()
    if not role_to_actions[userprofile.role].has_key('multiply'): return 

    m = MultiplyIssue( user=user, issue=issue, downgrade=downgrade )
    # TODO score change?
    return m.save()


def tag(user, issue, tags):
    """
    tag/retag an issue
    """
    userprofile = user.get_profile()
    if not role_to_actions[userprofile.role].has_key('tag'): return 
    #TODO score change?
    issue.tags = tags

    return tags


role_to_actions = {
    'anonymous citizen' : {
        'vote' : vote,
    },
    'citizen' : {
        'vote' : vote,
        'tag' : tag,
    },
    'active citizen' : {
        'vote' : vote,
        'tag' : tag,
        'propose' : propose,
    },
    'opinion leader' : {
        'vote' : vote,
        'tag' : tag,
        'propose' : propose,
        'multiply' : multiply,
    }
}


def get_actions(user):
    """return all possible game actions for a user """
    if not user.is_authenticated()  : return role_to_actions['anonymous citizen']
    userprofile = user.get_profile()
    actions = role_to_actions[userprofile.role]
    return actions

def get_unavailable_actions(user = None):
    """ 
    return dict with all game actions a user can NOT do with the
    required role as value
    """
    if not user.is_authenticated(): userprofile = {}
    else : userprofile = user.get_profile()

    all_actions = {}
    for role in roles.keys(): #collect all possible actions
        actions = role_to_actions.get(role , {} )
        for action , function in actions.iteritems():
            all_actions.setdefault( action , role )

    for action , function in get_actions(user).iteritems():
        all_actions.pop(action)

    return all_actions
