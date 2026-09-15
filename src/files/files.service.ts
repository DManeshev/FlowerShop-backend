import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { yandexS3 } from '../storage.yandex'

@Injectable()
export class FilesService {
	constructor(private prisma: PrismaService) {}

	async uploadImage(files: Express.Multer.File[]) {
		const uploadFiles = files.map(file => ({
			name: file.originalname,
			buffer: file.buffer
		}))

		const upload = await yandexS3.Upload(uploadFiles, '/images/')

		if (upload) {
			return upload
		}
	}

	async getListImage() {
		const images = await yandexS3.GetList('/images/')

		return images
	}

	async deleteImage(imagePath: string) {
		const isDeleted = await yandexS3.Remove(imagePath)

		return isDeleted
	}
}
