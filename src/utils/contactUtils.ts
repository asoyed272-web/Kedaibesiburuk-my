import { BUSINESS_CONFIG } from '../data/siteContent';

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultText = `Salam / Hi Kedai Besi Buruk,\n\nSaya ingin bertanya mengenai servis kutipan / penjualan besi & logam buruk.\n\nSila berikan maklumat harga dan pengambilan. Terima kasih!`;
  const textToEncode = customMessage || defaultText;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(textToEncode)}`;
}

export function getMaterialInquiryWhatsAppUrl(materialName: string, lang: 'en' | 'bm'): string {
  const message = lang === 'bm'
    ? `Salam Kedai Besi Buruk,\n\nSaya ada stok bagi: *${materialName}*.\nBolehkah saya dapatkan anggaran harga semasa dan syarat kutipan di lokasi saya?\n\n(Saya sertakan gambar jika perlu)`
    : `Hi Kedai Besi Buruk,\n\nI have scrap material for: *${materialName}*.\nCould you provide current market price estimation and on-site collection details?\n\n(Photos attached if needed)`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getPickupRequestWhatsAppUrl(data: {
  name: string;
  phone: string;
  location: string;
  materialType: string;
  estimatedWeight: string;
  notes: string;
}): string {
  const message = `*TEMPAHAN KUTIPAN BESI BURUK / SCRAP COLLECTION REQUEST*
----------------------------------------
👤 *Nama / Name:* ${data.name || 'Pelanggan'}
📞 *No. Telefon:* ${data.phone || 'Sila balas di WhatsApp'}
📍 *Lokasi / Kawasan:* ${data.location || 'Klang Valley'}
📦 *Jenis Bahan / Material:* ${data.materialType || 'Besi Campur / Logam'}
⚖️ *Anggaran Berat / Saiz Muatan:* ${data.estimatedWeight || 'Muatan Lori'}
📝 *Catatan / Nota:* ${data.notes || 'Sila maklumkan masa sesuai'}
----------------------------------------
_Dihantar melalui Laman Web Rasmi Kedai Besi Buruk_`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
