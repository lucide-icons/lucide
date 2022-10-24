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

public val Lucide.BookOpenCheck: ImageVector
    get() {
        if (_bookOpenCheck != null) {
            return _bookOpenCheck!!
        }
        _bookOpenCheck = Builder(name = "BookOpenCheck", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 3.0f)
                horizontalLineTo(2.0f)
                verticalLineToRelative(15.0f)
                horizontalLineToRelative(7.0f)
                curveToRelative(1.7f, 0.0f, 3.0f, 1.3f, 3.0f, 3.0f)
                verticalLineTo(7.0f)
                curveToRelative(0.0f, -2.2f, -1.8f, -4.0f, -4.0f, -4.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(16.0f, 12.0f)
                lineToRelative(2.0f, 2.0f)
                lineToRelative(4.0f, -4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 6.0f)
                verticalLineTo(3.0f)
                horizontalLineToRelative(-6.0f)
                curveToRelative(-2.2f, 0.0f, -4.0f, 1.8f, -4.0f, 4.0f)
                verticalLineToRelative(14.0f)
                curveToRelative(0.0f, -1.7f, 1.3f, -3.0f, 3.0f, -3.0f)
                horizontalLineToRelative(7.0f)
                verticalLineToRelative(-2.3f)
            }
        }
        .build()
        return _bookOpenCheck!!
    }

private var _bookOpenCheck: ImageVector? = null
