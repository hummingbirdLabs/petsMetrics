#!/usr/bin/env python3
"""Generate de-translations-map.json"""
import json, os, sys

T = {}

# === CHUNK: common/nav/home/profile ===
T.update({
    "common.disclaimer.standard": "Alle Berechnungen basieren auf veroffentlichten tierarztllichen Leitlinien (AAHA, WSAVA, AAFCO, AAFP). Die Ergebnisse sind Schatzwerte.",
    "common.disclaimer.tool": "Dieses Tool wird von petsMetrics nur zu allgemeinen Informationszwecken bereitgestellt und stellt keine tierarztliche Beratung dar. Konsultieren Sie einen zugelassenen Tierarzt fur Gesundheitsentscheidungen.",
    "common.disclaimer.toxic": "Diese Informationen werden von petsMetrics nur zu allgemeinen Informationszwecken bereitgestellt. Dies ist KEINE tierarztliche Beratung. Wenn Ihr Haustier potenziell giftige Substanzen aufgenommen haben konnte, kontaktieren Sie sofort Ihren Tierarzt oder die ASPCA Poison Control unter