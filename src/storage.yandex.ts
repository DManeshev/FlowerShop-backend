import EasyYandexS3 from "easy-yandex-s3"

export const yandexS3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY,
        secretAccessKey: process.env.YANDEX_SECRET_KEY
    },
    Bucket: 'flower-storage',
    debug: false
})
