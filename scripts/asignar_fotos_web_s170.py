# -*- coding: utf-8 -*-
"""[S170 · 30-sep-2026] Segunda tanda: fotos buscadas en la web (fabricante o listado comercial),
revisadas a ojo una por una. Misma mecánica que asignar_fotos_s170.py (sólo donde imagen_url está vacío).
Fuera a propósito: RB4012 (bolsas sin marca), D2700 (¿crisscut o gajo?), M6804/I74 (línea sin confirmar),
B3901/SP04 (corte sin confirmar), T228/3703/853623/MM/ARR150/BSA/BSALP/BBQP/RACH/CHP (sin fuente).
Uso: python scripts/asignar_fotos_web_s170.py [--escribir]"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asignar_fotos_s170 as a
a.FUENTE = {
    '1950': 'https://foodservice.grupobachoco.com/images/productos/1950_TENDER-EMPANIZADO_plat.jpg',
    'B4927': 'https://foodservice.grupobachoco.com/images/productos/4927_ALITAS-PICOSITAS-FC-plat.jpg',
    '4106': 'https://bafarmayoreo.com/wp-content/uploads/2020/06/4106-TENDER-COMPLETO-recortado.png',
    'DQSH': 'https://drryor7280ntb.cloudfront.net/media/catalog/product/3/0/30046100314228.jpg',
    'MZ200': 'https://www.surtilag.com/cdn/shop/files/MOSTAZASOBRES_600x.jpg',
    'MZ500': 'https://m.media-amazon.com/images/I/61fsiFsy0YL._AC_SL1500_.jpg',
    'MZ4B': 'https://ciemsafoodservice.com/wp-content/uploads/2024/04/JH12814-heinz-mostaza-pouch.webp',
    'TP200': 'https://www.webstaurantstore.com/images/products/extra_large/594485/2217751.jpg',
    'BCH': 'https://tienda.mrwings.com/wp-content/uploads/2025/09/BLUE-CHEESE-3.8-INGR-680X680-CANTIDAD.webp',
    'MANGOH414': 'https://tienda.mrwings.com/wp-content/uploads/2025/09/MANGO-HABANERO-414ML-INGR-680X680-CANTIDADES_1.webp',
    'SCAJUN': 'https://tienda.mrwings.com/wp-content/uploads/2025/09/CAJUN-SAZ-800G-680X680-min.png',
    'SPY': 'https://m.media-amazon.com/images/I/51V4tAMbpNL._AC_SL1000_.jpg',
    'SAPHOT': 'https://resources.claroshop.com/medios-plazavip/t1/1715182179SalsaParaAlitasHotLaPcimajpg',
    'BLCHG': 'https://drryor7280ntb.cloudfront.net/media/catalog/product/1/0/10026700139472_1.jpg',
    'CESAR': 'https://drryor7280ntb.cloudfront.net/media/catalog/product/1/0/10026700139762_1.jpg',
    'AS64': 'https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/domains/product-image/file/large_8a474d0a-51ea-49fa-b808-51553099e417.png',
    'GP64': 'https://cdnimg.webstaurantstore.com/images/products/xxl/901103/3147030.jpg',
    'BBQ64': 'https://roundeyesupply.com/cdn/shop/files/156677176.jpg?v=1711656055',
    'SCH64': 'https://cdnimg.webstaurantstore.com/images/products/xxl/901060/3147026.jpg',
    'PCH': 'https://fs.chg.com/wp-content/uploads/2024/12/1635366290_10041460943589_C1CB-12.jpg',
    '36900': 'https://growninidaho.com/wp-content/uploads/2026/02/crinkle.png',
    '36502': 'https://growninidaho.com/wp-content/uploads/2026/02/WaffleCut.png',
    '36800': 'https://growninidaho.com/wp-content/uploads/2026/02/handcut.png',
    '36700': 'https://growninidaho.com/wp-content/uploads/2026/02/Tots.png',
    'DS06': 'https://growninidaho.com/wp-content/uploads/2026/02/Shoestring.png',
    'AX046': 'https://drryor7280ntb.cloudfront.net/media/catalog/product/8/3/834183001055_2_lrdwvxw1wb1dhwld.jpg',
    'SC100': 'https://lambweston.scene7.com/is/image/lambweston/S12_LW-Stealth--Fries-Thin-RC-Skin-On-Parchment?$ProductImage$',
}
if __name__ == '__main__':
    a.main('--escribir' in sys.argv)
