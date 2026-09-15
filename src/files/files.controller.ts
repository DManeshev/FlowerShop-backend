import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFiles,
	Get,
	Delete,
	Body,
	HttpCode
} from '@nestjs/common'
import { FilesService } from './files.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Auth()
	@Post()
	@UseInterceptors(FilesInterceptor('files[]'))
	async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
		return this.filesService.uploadImage(files)
	}

	@Auth()
	@Get()
	async getListImage() {
		return this.filesService.getListImage()
	}

	@HttpCode(200)
	@Auth()
	@Delete()
	async deleteImage(@Body() dto: { path: string}) {
		return this.filesService.deleteImage(dto.path)
	}
}	
