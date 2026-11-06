"""S206 (6-nov-2026): copias web de los videos de Frites Atelier + póster de cada una.
Salen del material ya revisado (Videos/FRITES_ATELIER/dia2). Sólo los que no tienen pendiente de permiso de invitados
ni datos de preparación por confirmar: A2, A3, A4, A8, L3 y L6. A5/L5 (tiempos) y A9, A10, A1, L1, L7, L8 (invitados) NO.
Uso: python scripts/s206_videos_fa.py  ->  _fa_web/video/*.mp4 y *.webp
"""
import os, subprocess, sys

D2 = r"C:\Users\Dell\MrRuta\clientes\macsa\Videos\FRITES_ATELIER\dia2"
SAL = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_fa_web", "video")
os.makedirs(SAL, exist_ok=True)

VIDEOS = [
    # nombre web, carpeta, archivo, ancho, segundo del póster
    ("a2-de-la-caja-a-la-mesa", "salida_fb", "FA_MX_A2_de_la_caja_a_la_mesa", 720, 9),
    ("a3-no-vendemos-papas", "salida_9x16", "FA_MX_A3_no_vendemos_papas", 720, 14),
    ("a4-la-bolsa-hermes", "salida_9x16", "FA_MX_A4_la_bolsa_Hermes", 720, 2),
    ("a8-la-canasta", "salida_9x16", "FA_MX_A8_la_canasta", 720, 6),
    ("l3-el-atelier", "salida_16x9", "FA_MX_L3_el_atelier", 1280, 20),
    ("l6-la-marca", "salida_16x9", "FA_MX_L6_la_marca", 1280, 20),
    # Versión en inglés de los mismos cuatro reels (sin logo de MACSA), para /frites-atelier/en/
    ("en-a2-from-the-box-to-the-table", "salida_9x16_en", "FA_EN_MX_A2_from_the_box_to_the_table", 720, 9),
    ("en-a3-we-dont-sell-fries", "salida_9x16_en", "FA_EN_MX_A3_we_dont_sell_fries", 720, 14),
    ("en-a4-the-hermes-principle", "salida_9x16_en", "FA_EN_MX_A4_the_Hermes_principle", 720, 2),
    ("en-a8-the-basket", "salida_9x16_en", "FA_EN_MX_A8_the_basket", 720, 6),
]


def buscar(carpeta, base):
    p = os.path.join(D2, carpeta)
    for f in sorted(os.listdir(p)):
        if f.startswith(base) and f.endswith(".mp4"):
            return os.path.join(p, f)
    return os.path.join(D2, "salida_9x16", base + ".mp4")


for nombre, carpeta, base, ancho, seg in VIDEOS:
    src = buscar(carpeta, base)
    out = os.path.join(SAL, f"fa-{nombre}.mp4")
    pos = os.path.join(SAL, f"fa-{nombre}.webp")
    print(nombre, "<-", src, flush=True)
    if not os.path.exists(out):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-vf", f"scale={ancho}:-2", "-c:v", "libx264", "-preset", "slow",
                        "-crf", "26", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "112k", "-movflags", "+faststart", out], check=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(seg), "-i", src, "-frames:v", "1", "-vf", f"scale={ancho}:-2",
                    "-c:v", "libwebp", "-quality", "78", pos], check=True)
    print("   ", round(os.path.getsize(out) / 1048576, 1), "MB", flush=True)
print("LISTO")
