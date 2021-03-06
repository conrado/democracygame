#!/usr/bin/env python
# $Id: setup.py 6071 2009-08-01 13:27:44Z grubert $
# Copyright: This file has been placed in the public domain.

import sys
import os
import glob
try:
    from distutils.core import setup, Command
    from distutils.command.build import build
    from distutils.command.build_py import build_py
    from distutils.command.install_data import install_data
    from distutils.util import convert_path
except ImportError:
    print ('Error: The "distutils" standard module, which is required for the ')
    print ('installation of Docutils, could not be found.  You may need to ')
    print ('install a package called "python-devel" (or similar) on your ')
    print ('system using your package manager.')
    sys.exit(1)

try:
    from distutils.command.build_py import build_py_2to3 as build_py
except ImportError:
    from distutils.command.build_py import build_py


class smart_install_data(install_data):
    # Hack for Python > 2.3.
    # From <http://wiki.python.org/moin/DistutilsInstallDataScattered>,
    # by Pete Shinners.

    def run(self):
        #need to change self.install_dir to the library dir
        install_cmd = self.get_finalized_command('install')
        self.install_dir = getattr(install_cmd, 'install_lib')
        return install_data.run(self)

class build_data(Command):

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        build_py = self.get_finalized_command('build_py')
        data_files = self.distribution.data_files
        for f in data_files:
            dir = convert_path(f[0])
            dir = os.path.join(build_py.build_lib, dir)
            self.mkpath(dir)
            for data in f[1]:
                data = convert_path(data)
                self.copy_file(data, dir)

# let our build_data run
build.sub_commands.append(('build_data', lambda *a: True))


def do_setup():
    kwargs = package_data.copy()
    extras = get_extras()
    if extras:
        kwargs['py_modules'] = extras
    kwargs['classifiers'] = classifiers
    # Install data files properly.  Note that we use a different
    # hack for Python 2.2, which does not *always* work, though;
    # see
    # <http://article.gmane.org/gmane.text.docutils.user/2867>.
    # So for Python 2.3+, we prefer this hack.
    kwargs['cmdclass'] = {'install_data': smart_install_data,
                          'build_py': build_py,
                          'build_data': build_data}
    dist = setup(**kwargs)
    return dist

s5_theme_files = []
for dir in glob.glob('docutils/writers/s5_html/themes/*'):
    if os.path.isdir(dir):
        theme_files = glob.glob('%s/*' % dir)
        s5_theme_files.append((dir, theme_files))

package_data = {
    'name': 'docutils',
    'description': 'Docutils -- Python Documentation Utilities',
    'long_description': """\
Docutils is a modular system for processing documentation
into useful formats, such as HTML, XML, and LaTeX.  For
input Docutils supports reStructuredText, an easy-to-read,
what-you-see-is-what-you-get plaintext markup syntax.""", # wrap at col 60
    'url': 'http://docutils.sourceforge.net/',
    'version': '0.6',
    'author': 'David Goodger',
    'author_email': 'goodger@python.org',
    'license': 'public domain, Python, BSD, GPL (see COPYING.txt)',
    'platforms': 'OS-independent',
    'package_dir': {'docutils': 'docutils', '': 'extras'},
    'packages': ['docutils',
                 'docutils.languages',
                 'docutils.parsers',
                 'docutils.parsers.rst',
                 'docutils.parsers.rst.directives',
                 'docutils.parsers.rst.languages',
                 'docutils.readers',
                 'docutils.readers.python',
                 'docutils.transforms',
                 'docutils.writers',
                 'docutils.writers.html4css1',
                 'docutils.writers.pep_html',
                 'docutils.writers.s5_html',
                 'docutils.writers.latex2e',
                 'docutils.writers.newlatex2e',
                 'docutils.writers.odf_odt',
                 ],
    'data_files': ([('docutils/parsers/rst/include',
                     glob.glob('docutils/parsers/rst/include/*.txt')),
                    ('docutils/writers/html4css1',
                     ['docutils/writers/html4css1/html4css1.css',
                      'docutils/writers/html4css1/template.txt']),
                    ('docutils/writers/latex2e',
                     ['docutils/writers/latex2e/latex2e.tex']),
                    ('docutils/writers/newlatex2e',
                     ['docutils/writers/newlatex2e/base.tex']),
                    ('docutils/writers/pep_html',
                     ['docutils/writers/pep_html/pep.css',
                      'docutils/writers/pep_html/template.txt']),
                    ('docutils/writers/s5_html/themes',
                     ['docutils/writers/s5_html/themes/README.txt']),
                    ('docutils/writers/odf_odt',
                     ['docutils/writers/odf_odt/styles.odt']),
                     ]
                   + s5_theme_files),
    'scripts' : ['tools/rst2html.py',
                 'tools/rst2s5.py',
                 'tools/rst2latex.py',
                 'tools/rst2newlatex.py',
                 'tools/rst2xml.py',
                 'tools/rst2pseudoxml.py',
                 'tools/rstpep2html.py',
                 'tools/rst2odt.py',
                 'tools/rst2odt_prepstyles.py',
                 ],}
"""Distutils setup parameters."""

classifiers = [
    'Development Status :: 4 - Beta',
    'Environment :: Console',
    'Intended Audience :: End Users/Desktop',
    'Intended Audience :: Other Audience',
    'Intended Audience :: Developers',
    'Intended Audience :: System Administrators',
    'License :: Public Domain',
    'License :: OSI Approved :: Python Software Foundation License',
    'License :: OSI Approved :: BSD License',
    'License :: OSI Approved :: GNU General Public License (GPL)',
    'Operating System :: OS Independent',
    'Programming Language :: Python',
    'Topic :: Documentation',
    'Topic :: Software Development :: Documentation',
    'Topic :: Text Processing',
    'Natural Language :: English',      # main/default language, keep first
    'Natural Language :: Afrikaans',
    'Natural Language :: Esperanto',
    'Natural Language :: French',
    'Natural Language :: German',
    'Natural Language :: Italian',
    'Natural Language :: Russian',
    'Natural Language :: Slovak',
    'Natural Language :: Spanish',
    'Natural Language :: Swedish',]
"""Trove classifiers for the Distutils "register" command;
Python 2.3 and up."""

extra_modules = [('optparse', '1.4.1', None),
                 ('textwrap', None, None),
                 ('roman', '1.4', ['toRoman', 'fromRoman',
                                   'InvalidRomanNumeralError'])]
"""Third-party modules to install if they're not already present.
List of (module name, minimum __version__ string, [attribute names])."""

def get_extras():
    extras = []
    for module_name, version, attributes in extra_modules:
        try:
            module = __import__(module_name)
            if version and module.__version__ < version:
                raise ValueError
            for attribute in attributes or []:
                getattr(module, attribute)
            print ('"%s" module already present; ignoring extras/%s.py.'
                   % (module_name, module_name))
        except (ImportError, AttributeError, ValueError):
            extras.append(module_name)
    return extras


if __name__ == '__main__' :
    do_setup()
