import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import EasyYandexS3 from "easy-yandex-s3"

@Injectable()
export class FilesService {
	private readonly yandexS3: EasyYandexS3;

	constructor(
		private readonly configService: ConfigService
	) {
		this.yandexS3 = new EasyYandexS3({
			auth: {
				accessKeyId: this.configService.get<string>('YANDEX_ACCESS_KEY'),
				secretAccessKey: this.configService.get<string>('YANDEX_SECRET_KEY')
			},
			Bucket: 'flower-storage',
			debug: false
		});
	}

	async uploadImage(files: Express.Multer.File[]) {
		const uploadFiles = files.map(file => ({
			name: file.originalname,
			buffer: file.buffer
		}))

		const upload = await this.yandexS3.Upload(uploadFiles, '/images/')

		if (upload) {
			return upload
		}
	}

	async getListImage() {
		const images = await this.yandexS3.GetList('/images/')

		return images
	}

	async deleteImage(imagePath: string) {
		const isDeleted = await this.yandexS3.Remove(imagePath)

		return isDeleted
	}
}
