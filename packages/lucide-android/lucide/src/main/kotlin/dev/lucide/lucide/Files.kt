package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Files: ImageVector
    get() {
        if (_files != null) {
            return _files!!
        }
        _files = Builder(name = "Files", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.5f, 2.0f)
                horizontalLineTo(8.6f)
                curveToRelative(-0.4f, 0.0f, -0.8f, 0.2f, -1.1f, 0.5f)
                curveToRelative(-0.3f, 0.3f, -0.5f, 0.7f, -0.5f, 1.1f)
                verticalLineToRelative(12.8f)
                curveToRelative(0.0f, 0.4f, 0.2f, 0.8f, 0.5f, 1.1f)
                curveToRelative(0.3f, 0.3f, 0.7f, 0.5f, 1.1f, 0.5f)
                horizontalLineToRelative(9.8f)
                curveToRelative(0.4f, 0.0f, 0.8f, -0.2f, 1.1f, -0.5f)
                curveToRelative(0.3f, -0.3f, 0.5f, -0.7f, 0.5f, -1.1f)
                verticalLineTo(6.5f)
                lineTo(15.5f, 2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(3.0f, 7.6f)
                verticalLineToRelative(12.8f)
                curveToRelative(0.0f, 0.4f, 0.2f, 0.8f, 0.5f, 1.1f)
                curveToRelative(0.3f, 0.3f, 0.7f, 0.5f, 1.1f, 0.5f)
                horizontalLineToRelative(9.8f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 2.0f)
                verticalLineToRelative(5.0f)
                horizontalLineToRelative(5.0f)
            }
        }
        .build()
        return _files!!
    }

private var _files: ImageVector? = null
