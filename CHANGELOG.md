# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Created `ScrambleText` atom component for matrix-style text transitions.
- Integrated `ScrambleText` into the Hero section for a professional "decoding" effect.
- Added support for multiple phrases (slides) in the Hero section.
- Implemented a 5-second interval timer for alternating Hero phrases.
- Added staggered animation delays for prefix, highlight, and suffix reveal.
- Created project documentation structure (README, CHANGELOG, docs/).

### Changed

- Updated `heroContent` constant to use a `slides` array instead of flat properties.
- Refactored `HeroSection` to handle state-based slide transitions using scramble effects.

### Fixed

- Fixed a bug in `ScrambleText` where the last character could remain scrambled due to floating point rounding errors.
