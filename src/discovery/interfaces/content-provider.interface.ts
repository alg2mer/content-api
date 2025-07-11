import { PaginatedResultDto } from "../dto/paginated-result.dto";
import { SearchContentDto } from "../dto/search-content.dto";
import { Content } from "src/content/entities/content.entity";

export interface ContentProvider<T = any> {
  searchContent(input: SearchContentDto): Promise<PaginatedResultDto<Content>>;
}
